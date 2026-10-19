#!/usr/bin/env bash
# ==============================================================================
# Saalim's World — Linux & macOS Setup Script
# Mohammed Saalim's Cinematic 3D Developer Portfolio
# ==============================================================================

set -e

echo -e "\033[1;36m==========================================================\033[0m"
echo -e "\033[1;32m   SAALIM'S WORLD — CINEMATIC 3D DEVELOPER PORTFOLIO   \033[0m"
echo -e "\033[1;36m==========================================================\033[0m"

# 1. Virtual Environment
if [ ! -d "venv" ]; then
    echo -e "\033[1;33m[1/5] Creating Python virtual environment (venv)...\033[0m"
    python3 -m venv venv
else
    echo -e "\033[1;32m[1/5] Virtual environment already exists.\033[0m"
fi

source venv/bin/activate

# 2. Dependency Installation
echo -e "\033[1;33m[2/5] Installing dependencies from requirements.txt...\033[0m"
pip install -r requirements.txt

# 3. Environment Variables
if [ ! -f ".env" ]; then
    echo -e "\033[1;33m[3/5] Copying .env.example to .env...\033[0m"
    cp .env.example .env
fi

# 4. Migrations & Seed
echo -e "\033[1;33m[4/5] Applying database migrations...\033[0m"
python manage.py migrate

echo -e "\033[1;33mSeeding verified portfolio data for Mohammed Saalim...\033[0m"
python manage.py seed_portfolio

# 5. Run Server
echo -e "\033[1;32m[5/5] Setup complete! Starting server...\033[0m"
echo -e "\033[1;36mPortfolio URL: http://127.0.0.1:8000/\033[0m"
echo -e "\033[1;36mAdmin Portal:  http://127.0.0.1:8000/admin/\033[0m"
python manage.py runserver 0.0.0.0:8000
