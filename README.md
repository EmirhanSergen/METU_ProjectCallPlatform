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

## Running with Docker

To build and start the API in a container run:
```bash
docker build -t projectcall .
docker run --env-file backend/.env -p 8000:8000 projectcall
```

## Soft delete and unique constraints

Models using the `SoftDeleteMixin` keep records by setting an `is_deleted` flag
instead of removing rows.  For tables that contain unique fields (for example
`User.email` or `ApplicationForm.project_number`) a composite unique constraint
on that field and `is_deleted` is used.  This allows creating a new object with
the same value once the old record is marked as deleted.

If you already have a database created from an earlier version you need to
recreate the tables or manually add the new unique indexes.

