@echo off
cd /d "%~dp0"
echo Gromvex AI Movie Studio v04: http://127.0.0.1:8080/gromvex-studio/
start "" http://127.0.0.1:8080/gromvex-studio/
python -m http.server 8080
pause
