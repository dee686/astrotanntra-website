@echo off
setlocal EnableDelayedExpansion
title ASTROTANNTRA - Project Setup & Launch

echo ==========================================================
echo       ASTROTANNTRA - Windows Setup & Startup Script
echo   "Bhagya nhi, disha badalte hain hum"
echo ==========================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js is not found on your system.
    echo [*] Opening Node.js download page in your browser...
    start https://nodejs.org/
    echo.
    echo Please install Node.js (LTS version recommended), then run this script again.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Detected Node.js version: %NODE_VERSION%

:: 2. Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] npm is not found. Please ensure Node.js is properly installed with npm.
    pause
    exit /b 1
)

:: 3. Install dependencies if node_modules is missing or corrupted
if not exist "node_modules\" (
    echo.
    echo [*] Installing required project dependencies (npm install)...
    echo     Please wait, this will only take 1-2 minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo [!] Dependency installation failed.
        pause
        exit /b 1
    )
    echo [OK] All dependencies successfully installed.
) else (
    echo [OK] Dependencies already installed in node_modules.
)

:: 4. Option to choose mode (Development server or Production build)
echo.
echo ==========================================================
echo Select an option:
echo   [1] Start Development Server (Vite Live Hot-Reload - Recommended)
echo   [2] Build & Start Production Server (Express)
echo ==========================================================
set /p choice="Enter choice [1 or 2] (Default is 1): "

if "%choice%"=="2" (
    echo.
    echo [*] Building production bundle (npm run build)...
    call npm run build
    echo.
    echo [*] Starting Production Server on port 3000...
    start http://localhost:3000
    call npm start
) else (
    echo.
    echo [*] Starting Development Server (npm run dev)...
    echo [*] Press Ctrl+C at any time to stop the server.
    echo.
    timeout /t 2 >nul
    start http://localhost:5173
    call npm run dev
)

pause
