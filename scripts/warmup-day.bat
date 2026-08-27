@echo off
REM ============================================================
REM Alfredo do Belo — script chamado pelo Task Scheduler
REM Uso: warmup-day.bat <LIMIT> <OFFSET>
REM Exemplo: warmup-day.bat 1000 500  (envia 1000 emails a partir do offset 500)
REM ============================================================

setlocal
set PROJECT_DIR=c:\Users\GalaxyBook3\Documents\Claude Code\Alfredo
set LIMIT=%1
set OFFSET=%2

if "%LIMIT%"=="" (
  echo [ERRO] LIMIT nao informado. Uso: warmup-day.bat LIMIT OFFSET
  exit /b 1
)
if "%OFFSET%"=="" set OFFSET=0

cd /d "%PROJECT_DIR%"
echo [%date% %time%] Iniciando warmup: LIMIT=%LIMIT% OFFSET=%OFFSET%

call npx tsx scripts/send-email.ts --yes --limit %LIMIT% --offset %OFFSET%

echo [%date% %time%] Warmup finalizado (exit code %errorlevel%)
exit /b %errorlevel%
