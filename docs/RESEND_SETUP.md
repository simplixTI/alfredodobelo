# Setup Resend — Passo a passo

> Fazer amanhã cedo, antes do primeiro disparo. Estimativa: 30-45 min (excluindo propagação DNS, que pode levar até 24h mas geralmente resolve em ~15min).

---

## 1. Autenticar o domínio (SPF + DKIM + DMARC)

Sem isso, os emails caem em spam ou nem saem. Passo mais importante.

### 1.1 — Entrar no Resend
- Acessar https://resend.com/domains
- Login com a conta que gerou a API key (`re_9dC6wizt_...`)

### 1.2 — Adicionar o domínio
- Clicar **"Add Domain"**
- Domínio: `alfredodobelo.com.br`
- Region: **South America (São Paulo)** — menor latência pro Brasil
- Clicar **Add**

### 1.3 — Copiar os 3 registros DNS
O Resend vai mostrar uma tela com **3 registros** para adicionar no DNS do domínio:

| Tipo  | Nome                          | Valor                              |
|-------|-------------------------------|------------------------------------|
| MX    | `send.alfredodobelo.com.br`   | `feedback-smtp.sa-east-1.amazonses.com` (prioridade 10) |
| TXT   | `send.alfredodobelo.com.br`   | `v=spf1 include:amazonses.com ~all` |
| TXT   | `resend._domainkey.alfredodobelo.com.br` | (chave DKIM longa, copiar exatamente) |

### 1.4 — Adicionar no painel DNS do domínio
- Onde: painel do registrador (Registro.br, GoDaddy, Cloudflare, HostGator, etc.)
- Localizar seção **"DNS" / "Zone Editor" / "Gerenciar DNS"**
- Adicionar os 3 registros exatamente como o Resend mostrar
- **Atenção**: alguns painéis já preenchem o domínio raiz — nesse caso, colocar apenas `send` no campo Nome (não `send.alfredodobelo.com.br` completo)

### 1.5 — Adicionar DMARC (recomendado)
No mesmo painel DNS, adicionar mais um TXT:

| Tipo | Nome                        | Valor                                                          |
|------|-----------------------------|----------------------------------------------------------------|
| TXT  | `_dmarc.alfredodobelo.com.br` | `v=DMARC1; p=none; rua=mailto:contato@alfredodobelo.com.br`  |

`p=none` = apenas monitora, não bloqueia nada. Bom pra começar.

### 1.6 — Verificar no Resend
- Voltar em https://resend.com/domains
- Clicar **"Verify DNS Records"**
- Aguardar todos ficarem **verde/Verified** (pode levar 5-30min)
- Se demorar mais de 1h, checar se os registros foram salvos certo no DNS

---

## 2. Criar Audience e importar contatos

### 2.1 — Criar Audience
- Acessar https://resend.com/audiences
- Clicar **"Create Audience"**
- Nome: `Base Alfredo do Belo 2026`
- Clicar **Create**

### 2.2 — Importar CSV
- Dentro da audience recém-criada, clicar **"Import Contacts"**
- Upload do arquivo: `referencia/contatos_limpos.csv`
- Mapeamento de colunas:
  - Coluna `email` → **Email** (obrigatório)
  - Coluna `nome` → **First Name**
- Confirmar
- Aguardar processamento (97.601 contatos → ~5-10 min)

### 2.3 — Validar
- Após import, checar total de contatos importados
- Se algum foi rejeitado (email inválido), Resend mostra relatório

> **Nota**: Nosso script `scripts/send-email.ts` **não usa audience** — lê direto do CSV. A audience é útil pra:
> - Ter backup no painel Resend
> - Ver quem descadastrou (Resend gerencia unsubscribe)
> - Analytics de abertura/clique

---

## 3. Primeiro disparo de warmup — 500 emails

**Só rodar depois do domínio verificado (passo 1 completo).**

### 3.1 — Teste único primeiro (SEMPRE)
No terminal, na raiz do projeto:

```bash
npm run email:test
```

Isso envia um email de teste pra `teste@exemplo.com` (dry-run, não envia de verdade). Serve pra checar se o script roda sem erro.

Depois, teste real pra seu próprio email:
```bash
npx tsx scripts/send-email.ts --to lucasstxp@gmail.com --nome Lucas
```

- Abrir o email na caixa de entrada
- Verificar: chegou? Imagens carregam? Botões clicáveis? Selo eleitoral aparece? Link de descadastro funciona?

### 3.2 — Se o teste passou, rodar warmup 500
```bash
npx tsx scripts/send-email.ts --limit 500
```

- Script vai pedir confirmação: digitar `ENVIAR`
- Duração: ~5 min (100 emails por batch, 2 batches/s)
- Log gerado em `logs/send-YYYY-MM-DDTHHMMSS.log`

### 3.3 — Aguardar 24h antes do próximo lote
- Checar métricas no Resend: bounces, complaints, abertura
- Se bounce rate < 5% e complaint < 0.1%: seguir pro próximo lote
- Se maior: **parar** e investigar antes de continuar

### 3.4 — Cronograma sugerido de warmup
| Dia | Volume  | Comando |
|-----|---------|---------|
| 1   | 500     | `--limit 500` |
| 2   | 1.000   | `--limit 1000 --offset 500` |
| 3   | 2.000   | `--limit 2000 --offset 1500` |
| 4   | 5.000   | `--limit 5000 --offset 3500` |
| 5   | 10.000  | `--limit 10000 --offset 8500` |
| 6+  | 10.000/dia até zerar | ajustar offset a cada rodada |

---

## 4. Checklist rápido (imprimir mentalmente)

- [ ] Domínio verificado no Resend (todos verdes)
- [ ] Audience criada e CSV importado
- [ ] Teste único enviado pro próprio email — validado visualmente
- [ ] Primeiro lote de 500 enviado
- [ ] Log salvo em `logs/`
- [ ] Aguardar 24h e checar métricas antes do próximo lote

---

## Problemas comuns

**"Domain not verified"** → Aguardar propagação DNS. Se passou 2h, verificar se os registros foram salvos corretamente.

**"RESEND_API_KEY não configurada"** → Checar se `.env.local` tem a chave e se o script está sendo rodado da raiz do projeto.

**Email cai em spam mesmo com domínio verificado** → Normal nos primeiros disparos. Warmup gradual resolve. Não subir volume rápido demais.

**Emails duplicados no CSV** → Já foram removidos no `contatos_limpos.csv` (97.601 únicos de 108.190 originais).
