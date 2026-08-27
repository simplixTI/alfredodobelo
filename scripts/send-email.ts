#!/usr/bin/env node
/**
 * Script de disparo controlado de email marketing via Resend.
 *
 * Uso:
 *   npx tsx scripts/send-email.ts --dry-run              # simula, não envia
 *   npx tsx scripts/send-email.ts --to teste@x.com       # envio único de teste
 *   npx tsx scripts/send-email.ts --limit 500            # warmup: envia só os 500 primeiros
 *   npx tsx scripts/send-email.ts --limit 10000 --offset 500   # lote 2 (10k após os 500)
 *   npx tsx scripts/send-email.ts                        # envia TUDO (perigoso!)
 *
 * Flags:
 *   --csv       caminho pro CSV (default: referencia/contatos_limpos.csv)
 *   --limit     máximo de emails a processar (default: sem limite)
 *   --offset    pula os primeiros N registros
 *   --to        envia apenas para este email (teste único)
 *   --dry-run   não chama a API do Resend, só loga
 *
 * Segurança:
 *   - Confirmação interativa ao rodar sem --dry-run e sem --to.
 *   - Rate limit: 2 batches/s (100 emails cada = 200 emails/s).
 *   - Logs em logs/send-YYYY-MM-DDTHHMMSS.log
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
import { render } from "@react-email/render";
import { Resend } from "resend";
import fs from "node:fs/promises";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import AlfredoDoBeloEmail from "../src/emails/AlfredoDoBeloEmail";

// ---------- Parse CLI ----------
const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.findIndex((a) => a === `--${name}`);
  if (i >= 0 && i + 1 < args.length) return args[i + 1];
  return undefined;
};
const has = (name: string) => args.includes(`--${name}`);

const CSV_PATH =
  flag("csv") ||
  path.resolve(process.cwd(), "referencia/contatos_limpos.csv");
const LIMIT = parseInt(flag("limit") || "0", 10);
const OFFSET = parseInt(flag("offset") || "0", 10);
const SINGLE_TO = flag("to");
const DRY = has("dry-run");
const YES = has("yes");

// ---------- Config Resend ----------
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "alfredo@alfredodobelo.com.br";
const FROM_NAME = process.env.RESEND_FROM_NAME || "Alfredo do Belo 1001";
const REPLY_TO = process.env.RESEND_REPLY_TO || "contato@alfredodobelo.com.br";
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`;

if (!RESEND_API_KEY && !DRY) {
  console.error("[ERRO] RESEND_API_KEY não configurada em .env.local");
  process.exit(1);
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// ---------- Log setup ----------
const logDir = path.resolve(process.cwd(), "logs");
const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const logPath = path.join(logDir, `send-${ts}.log`);

async function log(line: string) {
  const stamp = `[${new Date().toISOString()}] ${line}`;
  console.log(stamp);
  await fs.mkdir(logDir, { recursive: true }).catch(() => {});
  await fs.appendFile(logPath, stamp + "\n").catch(() => {});
}

// ---------- Ler CSV ----------
type Contact = { email: string; nome: string };

async function loadCsv(): Promise<Contact[]> {
  let raw = await fs.readFile(CSV_PATH, "utf-8");
  // Remove BOM UTF-8 se presente (\uFEFF)
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = lines.shift();
  if (!header || !header.toLowerCase().startsWith("email")) {
    throw new Error(
      `CSV inválido — primeira linha deve ser "email,nome". Recebi: ${header}`,
    );
  }
  return lines.map((l) => {
    const [email, ...rest] = l.split(",");
    return { email: email.trim(), nome: rest.join(",").trim() };
  });
}

// ---------- Confirmação interativa ----------
async function confirm(msg: string): Promise<boolean> {
  const rl = readline.createInterface({ input, output });
  const ans = (await rl.question(`${msg} (digite ENVIAR): `)).trim();
  rl.close();
  return ans === "ENVIAR";
}

// ---------- Main ----------
async function main() {
  await log("=".repeat(60));
  await log(`Alfredo do Belo — disparo controlado`);
  await log(`Modo: ${DRY ? "DRY-RUN (não envia)" : "ENVIO REAL"}`);
  await log(`From: ${FROM} · Reply-to: ${REPLY_TO}`);

  // Modo teste único
  if (SINGLE_TO) {
    await log(`Envio único de teste para: ${SINGLE_TO}`);
    const nome = flag("nome") || "";
    const html = await render(
      AlfredoDoBeloEmail({
        firstName: nome,
        assetsBaseUrl:
          process.env.NEXT_PUBLIC_ASSETS_BASE_URL ||
          "https://www.alfredodobelo.com.br",
      }),
    );

    if (DRY) {
      await log(`[DRY] Enviaria para ${SINGLE_TO}, HTML de ${html.length} chars`);
      return;
    }

    const { data, error } = await resend!.emails.send({
      from: FROM,
      to: SINGLE_TO,
      replyTo: REPLY_TO,
      subject: "Cultura que move. Gente que transforma. — Alfredo do Belo 1001",
      html,
    });
    if (error) {
      await log(`[ERRO] ${JSON.stringify(error)}`);
      process.exit(1);
    }
    await log(`[OK] Enviado. id=${data?.id}`);
    return;
  }

  // Modo lote
  const all = await loadCsv();
  const sliced = all.slice(OFFSET, LIMIT > 0 ? OFFSET + LIMIT : undefined);
  await log(
    `CSV: ${CSV_PATH} · total ${all.length} · offset ${OFFSET} · limit ${LIMIT || "TODOS"} · fila ${sliced.length}`,
  );

  if (!DRY && !YES) {
    const ok = await confirm(
      `Vou enviar para ${sliced.length} contatos AGORA. Confirmar?`,
    );
    if (!ok) {
      await log("Abortado pelo usuário.");
      return;
    }
  } else if (YES) {
    await log(`[AUTO] --yes ativo, pulando confirma\u00e7\u00e3o interativa.`);
  }

  // Batch endpoint: até 100 por chamada
  const BATCH_SIZE = 100;
  const DELAY_MS = 500; // 2 req/s
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < sliced.length; i += BATCH_SIZE) {
    const batch = sliced.slice(i, i + BATCH_SIZE);

    // Renderiza cada email com nome personalizado (paraleliza)
    const emails = await Promise.all(
      batch.map(async (c) => ({
        from: FROM,
        to: c.email,
        replyTo: REPLY_TO,
        subject: "Cultura que move. Gente que transforma. — Alfredo do Belo 1001",
        html: await render(
          AlfredoDoBeloEmail({
            firstName: c.nome,
            assetsBaseUrl:
              process.env.NEXT_PUBLIC_ASSETS_BASE_URL ||
              "https://www.alfredodobelo.com.br",
          }),
        ),
      })),
    );

    if (DRY) {
      await log(
        `[DRY] batch ${i / BATCH_SIZE + 1} · ${batch.length} emails · primeiro: ${batch[0]?.email}`,
      );
      sent += batch.length;
      continue;
    }

    try {
      const res = await resend!.batch.send(emails);
      if (res.error) {
        failed += batch.length;
        await log(`[ERRO batch] ${JSON.stringify(res.error)}`);
      } else {
        sent += batch.length;
        await log(
          `[OK] batch ${i / BATCH_SIZE + 1} · ${batch.length} enviados · acumulado ${sent}/${sliced.length}`,
        );
      }
    } catch (e) {
      failed += batch.length;
      await log(`[EXCEÇÃO batch] ${(e as Error).message}`);
    }

    // Rate limit
    if (i + BATCH_SIZE < sliced.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  await log("=".repeat(60));
  await log(`FIM · enviados: ${sent} · falhas: ${failed} · log: ${logPath}`);
}

main().catch(async (e) => {
  await log(`[FATAL] ${e.message}`);
  process.exit(1);
});
