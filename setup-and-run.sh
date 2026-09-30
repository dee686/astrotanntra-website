#!/usr/bin/env bash
# ASTROTANNTRA - Automatic Setup & Launch Script for Linux / macOS / Git Bash / WSL
# "Bhagya nhi, disha badalte hain hum"

echo "=========================================================="
echo "      ASTROTANNTRA - Setup & Startup Script"
echo "=========================================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[!] Node.js is not installed. Please install Node.js (https://nodejs.org/)."
    exit 1
fi

echo "[OK] Node.js version: $(node -v)"
echo "[OK] npm version: $(npm -v)"

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo ""
    echo "[*] Installing project dependencies (npm install)..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[!] npm install failed."
        exit 1
    fi
    echo "[OK] Dependencies successfully installed."
else
    echo "[OK] node_modules already exists."
fi

echo ""
echo "Select mode:"
echo "  1) Development Mode (Vite - Port 5173 - Hot reload)"
echo "  2) Production Mode (Express - Port 3000)"
read -p "Enter choice [1 or 2] (Default 1): " choice

if [ "$choice" = "2" ]; then
    echo "[*] Building and starting production server..."
    npm run build
    npm start
else
    echo "[*] Starting development server..."
    npm run dev
fi
