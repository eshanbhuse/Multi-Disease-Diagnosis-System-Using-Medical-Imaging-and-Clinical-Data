#!/usr/bin/env bash
set -e  # stop on error

echo "⚙️ Installing Python 3.12 manually..."
apt-get update -y
apt-get install -y python3.12 python3.12-venv python3.12-dev

echo "📦 Creating virtual environment..."
python3.12 -m venv .venv
source .venv/bin/activate

echo "⬆️ Upgrading pip & installing dependencies..."
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

echo "✅ Build complete!"
