# Project Call Platform

This repository contains a simple FastAPI application for managing academic project call applications. The backend lives in the `backend` directory and uses SQLAlchemy and Pydantic.

## Setup

1. **Python**: Install Python 3.11.
2. **Create virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install requirements**:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. **Environment variables**:
   Copy `.env.example` inside the `backend` directory to `.env` and adjust the values.

   Required variables are:
   - `DATABASE_URL` – PostgreSQL connection string
   - `SECRET_KEY` – application secret

## Running the app

From the `backend` directory run:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.
