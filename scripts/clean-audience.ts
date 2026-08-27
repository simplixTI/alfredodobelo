#!/usr/bin/env node
/**
 * Limpa uma Audience do Resend deletando todos os contatos.
 *
 * Uso:
 *   npx tsx scripts/clean-audience.ts --list              # lista audiences
 *   npx tsx scripts/clean-audience.ts --audience <ID> --dry-run   # simula
 *   npx tsx scripts/clean-audience.ts --audience <ID>              # executa
 *
 * Flags:
 *   --list         lista todas as audiences e seus IDs
 *   --audience ID  ID da audience a limpar (obrigatório se não usar --list)
 *   --dry-run      lista contatos que seriam deletados, não deleta
 *   --limit N      limita a N deleções (útil pra teste)
 *
 * Segurança:
 *   - Confirmação interativa antes de deletar (digite CONFIRMAR)
 *   - Rate limit: 8 req/s (respeita limite Resend de 10/s)
 *   - Logs em logs/clean-YYYY-MM-DDTHHMMSS.log
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
import { Resend } from "resend";
import fs from "node:fs/promises";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// ---------- CLI ----------
const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.findIndex((a) => a === `--${name}`);
  if (i >= 0 && i + 1 < args.length) return args[i + 1];
  return undefined;
};
const has = (name: string) => args.includes(`--${name}`);

const LIST_MODE = has("list");
const AUDIENCE_ID = flag("audience");
const DRY = has("dry-run");
const LIMIT = parseInt(flag("limit") || "0", 10);

// ---------- Resend ----------
// Prefere admin key (full access), cai pra sending key se não tiver
const RESEND_KEY = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY;
if (!RESEND_KEY) {
  console.error(
    "[ERRO] RESEND_ADMIN_API_KEY (ou RESEND_API_KEY) não configurada em .env.local",
  );
  process.exit(1);
}
const resend = new Resend(RESEND_KEY);

// ---------- Log ----------
const logDir = path.resolve(process.cwd(), "logs");
const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const logPath = path.join(logDir, `clean-${ts}.log`);

async function log(line: string) {
  const stamp = `[${new Date().toISOString()}] ${line}`;
  console.log(stamp);
  await fs.mkdir(logDir, { recursive: true }).catch(() => {});
  await fs.appendFile(logPath, stamp + "\n").catch(() => {});
}

async function confirm(msg: string): Promise<boolean> {
  const rl = readline.createInterface({ input, output });
  const ans = (await rl.question(`${msg} (digite CONFIRMAR): `)).trim();
  rl.close();
  return ans === "CONFIRMAR";
}

// ---------- Modo LIST ----------
async function listAudiences() {
  const { data, error } = await resend.audiences.list();
  if (error) {
    await log(`[ERRO] ${JSON.stringify(error)}`);
    process.exit(1);
  }
  const audiences = data?.data ?? [];
  await log(`Audiences encontradas: ${audiences.length}`);
  for (const a of audiences) {
    console.log(`  ID: ${a.id}  ·  Nome: ${a.name}  ·  Criada: ${a.created_at}`);
  }
  console.log(`\nUse: npx tsx scripts/clean-audience.ts --audience <ID>`);
}

// ---------- Modo CLEAN ----------
async function cleanAudience(audienceId: string) {
  await log("=".repeat(60));
  await log(`Limpeza da audience: ${audienceId}`);
  await log(`Modo: ${DRY ? "DRY-RUN (não deleta)" : "DELEÇÃO REAL"}`);

  // Lista contatos
  await log(`Buscando contatos...`);
  const { data, error } = await resend.contacts.list({ audienceId });
  if (error) {
    await log(`[ERRO listar contatos] ${JSON.stringify(error)}`);
    process.exit(1);
  }
  const contacts = data?.data ?? [];
  const total = contacts.length;
  await log(`Total de contatos na audience: ${total}`);

  if (total === 0) {
    await log("Nada a fazer.");
    return;
  }

  const alvos = LIMIT > 0 ? contacts.slice(0, LIMIT) : contacts;
  await log(`Alvo desta rodada: ${alvos.length} contatos`);

  if (DRY) {
    await log(`[DRY] Primeiros 5: ${alvos.slice(0, 5).map((c) => c.email).join(", ")}`);
    await log(`[DRY] Seriam deletados ${alvos.length} contatos.`);
    return;
  }

  // Confirmação
  const ok = await confirm(
    `Vou DELETAR ${alvos.length} contatos da audience ${audienceId}. Confirmar?`,
  );
  if (!ok) {
    await log("Abortado pelo usuário.");
    return;
  }

  // Deleta com rate limit (8 req/s ≈ 125ms delay)
  const DELAY_MS = 130;
  let deleted = 0;
  let failed = 0;

  for (let i = 0; i < alvos.length; i++) {
    const c = alvos[i];
    try {
      const { error } = await resend.contacts.remove({
        audienceId,
        id: c.id,
      });
      if (error) {
        failed++;
        await log(`[ERRO] ${c.email} · ${JSON.stringify(error)}`);
      } else {
        deleted++;
        if (deleted % 100 === 0 || deleted === alvos.length) {
          await log(`Progresso: ${deleted}/${alvos.length} deletados · ${failed} falhas`);
        }
      }
    } catch (e) {
      failed++;
      await log(`[EXCEÇÃO] ${c.email} · ${(e as Error).message}`);
    }

    if (i < alvos.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  await log("=".repeat(60));
  await log(`FIM · deletados: ${deleted} · falhas: ${failed} · log: ${logPath}`);
  await log(
    `\nSe a audience ainda tem contatos (paginação Resend), rode o script de novo.`,
  );
}

// ---------- Main ----------
async function main() {
  if (LIST_MODE) {
    await listAudiences();
    return;
  }

  if (!AUDIENCE_ID) {
    console.error(
      "[ERRO] Faltou --audience <ID>. Rode --list primeiro pra descobrir o ID.",
    );
    console.error(
      "\nUso: npx tsx scripts/clean-audience.ts --list",
    );
    process.exit(1);
  }

  await cleanAudience(AUDIENCE_ID);
}

main().catch(async (e) => {
  await log(`[FATAL] ${e.message}`);
  process.exit(1);
});
