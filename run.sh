#!/usr/bin/env bash
echo "============================================================"
echo "        Starting ASTROTANNTRA (Vedic Astrology Website)"
echo "============================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH!"
    echo "Please install Node.js from https://nodejs.org/ and try again."
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing required dependencies..."
    npm install
fi

echo ""
echo "[SUCCESS] Dependencies verified. Starting development server..."
echo "Open http://localhost:5173 in your browser."
echo ""

npm run dev
