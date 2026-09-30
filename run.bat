@echo off
title ASTROTANNTRA Web Application
echo ============================================================
echo         Starting ASTROTANNTRA (Vedic Astrology Website)
echo ============================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [INFO] Installing required dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed!
        pause
        exit /b 1
    )
)

echo.
echo [SUCCESS] Dependencies verified. Starting development server...
echo The website will be available at http://localhost:5173
echo.

start http://localhost:5173
call npm run dev
pause
