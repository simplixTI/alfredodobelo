# Automação do Warmup — Task Scheduler

## Modelo híbrido

- **Dia 1 (manual)** — você aciona pra validar tudo antes de automatizar
- **Dias 2-13 (automático)** — Windows Task Scheduler dispara às **09:00** cada dia

## Cronograma

| Dia | Data*    | Volume | Offset | Task Name                    |
|-----|----------|--------|--------|------------------------------|
| 1   | Amanhã   | 500    | 0      | **manual** (não agendado)    |
| 2   | +1       | 1.000  | 500    | AlfredoBelo_Warmup_Dia2_1k   |
| 3   | +2       | 2.000  | 1.500  | AlfredoBelo_Warmup_Dia3_2k   |
| 4   | +3       | 5.000  | 3.500  | AlfredoBelo_Warmup_Dia4_5k   |
| 5   | +4       | 10.000 | 8.500  | AlfredoBelo_Warmup_Dia5_10k  |
| 6-13 | +5 a +12 | 10.000/dia | ... | AlfredoBelo_Warmup_Dia6..13 |

Total: ~98.500 emails ao longo de 13 dias. (\*Datas relativas ao dia em que rodar o script de agendamento.)

## Passo 1 — Dia 1 (manual, amanhã)

```bash
cd "c:/Users/GalaxyBook3/Documents/Claude Code/Alfredo"
npx tsx scripts/send-email.ts --limit 500
```

Script vai pedir confirmação (`digite ENVIAR`). Duração ~3-5min. Log em `logs/send-*.log`.

**Após o disparo, checar no Resend** (https://resend.com/emails):
- Bounce rate < 5%?
- Complaint rate < 0.1%?
- Delivered > 95%?

Se OK, seguir pro passo 2. Se ruim, PARAR e investigar.

## Passo 2 — Agendar dias 2-13

Abrir PowerShell **como Administrador** (Win+X → "Terminal (Admin)" ou "PowerShell (Admin)"):

```powershell
cd "c:\Users\GalaxyBook3\Documents\Claude Code\Alfredo"
powershell -ExecutionPolicy Bypass -File scripts\schedule-warmup.ps1
```

Cria 12 tasks no Windows Task Scheduler, cada uma agendada pra 09:00 do dia correspondente. O primeiro disparo automático acontece 1 dia após você rodar o script.

## Comandos úteis

**Listar tasks criadas**:
```powershell
schtasks /Query /TN AlfredoBelo_Warmup_* /FO TABLE
```

**Ver detalhes de uma task**:
```powershell
schtasks /Query /TN AlfredoBelo_Warmup_Dia2_1k /V /FO LIST
```

**Deletar uma task específica**:
```powershell
schtasks /Delete /TN AlfredoBelo_Warmup_Dia2_1k /F
```

**Deletar todas as tasks do warmup**:
```powershell
schtasks /Query /TN AlfredoBelo_Warmup_* /FO CSV /NH | ForEach-Object {
  ($_ -split ",")[0].Trim('"')
} | ForEach-Object {
  schtasks /Delete /TN $_ /F
}
```

**Rodar uma task manualmente agora (teste)**:
```powershell
schtasks /Run /TN AlfredoBelo_Warmup_Dia2_1k
```

## Requisitos importantes

1. **Windows precisa estar ligado no horário agendado** (09:00). Se estiver hibernando/desligado, a task não roda (ou roda quando ligar, dependendo config).
2. **Não deletar** a pasta do projeto ou mover arquivos — os caminhos são absolutos.
3. **Não deletar** `.env.local` — sem a `RESEND_API_KEY` o script falha.
4. **Não deletar** `referencia/contatos_limpos.csv` — sem CSV nada envia.

## Monitoramento diário

Toda manhã, checar:
1. `logs/send-YYYY-MM-DD*.log` — resultado do dia
2. https://resend.com/emails — dashboard de bounces/complaints
3. Se algo estranho, **pausar** os próximos dias:
   ```powershell
   schtasks /Query /TN AlfredoBelo_Warmup_* /FO CSV /NH | ForEach-Object {
     ($_ -split ",")[0].Trim('"')
   } | ForEach-Object {
     schtasks /Change /TN $_ /DISABLE
   }
   ```

Pra reativar depois: trocar `/DISABLE` por `/ENABLE`.
