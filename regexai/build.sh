#!/usr/bin/env bash

# Install tailwindcss (optional, skip if using CDN)
npm install
npx tailwindcss -i ./static/src/input.css -o ./static/css/output.css --minify

# Django collect static
python3 manage.py collectstatic --noinput

# Django DB migration
python3 manage.py migrate
