@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================================
echo GROMVEX FULL SITE v11 - LOCAL PREVIEW
echo ============================================================
echo Folder: %CD%
echo URL:    http://127.0.0.1:8080/
echo.

powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:8080/'" >nul 2>&1

where py >nul 2>&1
if not errorlevel 1 (
  py -3 -m http.server 8080 --bind 127.0.0.1
  exit /b %errorlevel%
)

where python >nul 2>&1
if not errorlevel 1 (
  python -m http.server 8080 --bind 127.0.0.1
  exit /b %errorlevel%
)

echo ERROR: Python is not installed or not available in PATH.
pause
exit /b 1
