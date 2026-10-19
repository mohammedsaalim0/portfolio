# ==============================================================================
# Saalim's World — Windows Setup Script (PowerShell)
# Mohammed Saalim's Cinematic 3D Developer Portfolio
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SAALIM'S WORLD — CINEMATIC 3D DEVELOPER PORTFOLIO   " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Virtual Environment Setup
if (-not (Test-Path "venv")) {
    Write-Host "[1/5] Creating Python virtual environment (venv)..." -ForegroundColor Yellow
    python -m venv venv
} else {
    Write-Host "[1/5] Existing virtual environment found." -ForegroundColor Green
}

# Activate virtual environment
& ".\venv\Scripts\Activate.ps1"

# 2. Dependency Installation
Write-Host "[2/5] Installing Python dependencies from requirements.txt..." -ForegroundColor Yellow
pip install -r requirements.txt

# 3. Environment Variables
if (-not (Test-Path ".env")) {
    Write-Host "[3/5] Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
} else {
    Write-Host "[3/5] .env file already exists." -ForegroundColor Green
}

# 4. Database Migrations & Initial Seed
Write-Host "[4/5] Running database migrations..." -ForegroundColor Yellow
python manage.py migrate

Write-Host "Seeding verified portfolio data for Mohammed Saalim..." -ForegroundColor Yellow
python manage.py seed_portfolio

# 5. Starting Local Development Server
Write-Host "[5/5] Setup complete! Starting Django development server..." -ForegroundColor Green
Write-Host "Portfolio URL: http://127.0.0.1:8000/" -ForegroundColor Cyan
Write-Host "Admin Portal:  http://127.0.0.1:8000/admin/" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to terminate the server." -ForegroundColor Gray

python manage.py runserver
