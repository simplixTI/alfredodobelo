# ============================================================
# Alfredo do Belo — cria tasks no Task Scheduler para warmup automático
#
# Uso (rodar como Administrador uma única vez):
#   powershell -ExecutionPolicy Bypass -File scripts/schedule-warmup.ps1
#
# Cronograma criado (todos os dias às 09:00, começando 1 dia após hoje):
#   Dia 2:  1.000 emails (offset 500)
#   Dia 3:  2.000 emails (offset 1.500)
#   Dia 4:  5.000 emails (offset 3.500)
#   Dia 5: 10.000 emails (offset 8.500)
#   Dia 6: 10.000 emails (offset 18.500)
#   Dia 7: 10.000 emails (offset 28.500)
#   ... continua até zerar (~14 dias)
#
# O DIA 1 (500 emails) NÃO é agendado — é manual pra você validar antes.
# Rode manualmente: npx tsx scripts/send-email.ts --limit 500
#
# Para listar tasks criadas:  schtasks /Query /TN "AlfredoBelo_Warmup_*"
# Para deletar todas:         schtasks /Query /TN "AlfredoBelo_Warmup_*" /FO CSV /NH | %{ ($_ -split ",")[0].Trim('"') } | %{ schtasks /Delete /TN $_ /F }
# ============================================================

$ProjectDir = "c:\Users\GalaxyBook3\Documents\Claude Code\Alfredo"
$BatchScript = "$ProjectDir\scripts\warmup-day.bat"
$StartHour = "09:00"

# Cronograma: [dia_a_partir_de_hoje, limit, offset]
$Schedule = @(
    @{ DayOffset = 1;  Limit = 1000;  Offset = 500;   Label = "Dia2_1k"    }
    @{ DayOffset = 2;  Limit = 2000;  Offset = 1500;  Label = "Dia3_2k"    }
    @{ DayOffset = 3;  Limit = 5000;  Offset = 3500;  Label = "Dia4_5k"    }
    @{ DayOffset = 4;  Limit = 10000; Offset = 8500;  Label = "Dia5_10k"   }
    @{ DayOffset = 5;  Limit = 10000; Offset = 18500; Label = "Dia6_10k"   }
    @{ DayOffset = 6;  Limit = 10000; Offset = 28500; Label = "Dia7_10k"   }
    @{ DayOffset = 7;  Limit = 10000; Offset = 38500; Label = "Dia8_10k"   }
    @{ DayOffset = 8;  Limit = 10000; Offset = 48500; Label = "Dia9_10k"   }
    @{ DayOffset = 9;  Limit = 10000; Offset = 58500; Label = "Dia10_10k"  }
    @{ DayOffset = 10; Limit = 10000; Offset = 68500; Label = "Dia11_10k"  }
    @{ DayOffset = 11; Limit = 10000; Offset = 78500; Label = "Dia12_10k"  }
    @{ DayOffset = 12; Limit = 10000; Offset = 88500; Label = "Dia13_10k"  }
)

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "Alfredo do Belo — Agendamento de warmup" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

foreach ($item in $Schedule) {
    $TaskName = "AlfredoBelo_Warmup_$($item.Label)"
    $Date = (Get-Date).AddDays($item.DayOffset).ToString("dd/MM/yyyy")
    $Args = "$($item.Limit) $($item.Offset)"

    # Deleta task antiga se existir
    schtasks /Query /TN $TaskName 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        schtasks /Delete /TN $TaskName /F | Out-Null
    }

    # Cria nova task
    $Result = schtasks /Create `
        /TN $TaskName `
        /TR "`"$BatchScript`" $Args" `
        /SC ONCE `
        /SD $Date `
        /ST $StartHour `
        /F 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK  " -ForegroundColor Green -NoNewline
        Write-Host "$TaskName -> $Date $StartHour (limit=$($item.Limit) offset=$($item.Offset))"
    } else {
        Write-Host "ERRO " -ForegroundColor Red -NoNewline
        Write-Host "$TaskName -> $Result"
    }
}

Write-Host ""
Write-Host "Agendamento concluido." -ForegroundColor Cyan
Write-Host "Verificar tasks: " -NoNewline
Write-Host "schtasks /Query /TN AlfredoBelo_Warmup_*" -ForegroundColor Yellow
Write-Host "Logs de cada execucao ficam em: " -NoNewline
Write-Host "$ProjectDir\logs\" -ForegroundColor Yellow
