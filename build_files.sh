#!/bin/bash
# Vercel build script
echo "Building project for Vercel..."
python3 -m pip install -r requirements.txt
python3 manage.py collectstatic --noinput
python3 manage.py migrate --noinput
python3 manage.py seed_portfolio
echo "Build finished successfully!"
