#!/usr/bin/env bash
# Force Render to use pip (not Poetry) and Python 3.12

echo "Installing Python 3.12 manually..."
apt-get update && apt-get install -y python3.12 python3.12-venv python3.12-dev

echo "Creating virtual environment..."
python3.12 -m venv .venv
source .venv/bin/activate

echo "Upgrading pip and installing requirements..."
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
