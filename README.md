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
   The dependencies include `python-multipart`, which is required for file uploads.
4. **Environment variables**:
   Copy `.env.example` inside the `backend` directory to `.env` and adjust the values.

   Required variables are:
   - `DATABASE_URL` – PostgreSQL connection string. When using
     `docker-compose` this should be
     `postgresql://postgres:postgres@db:5432/project_call`.
   - `SECRET_KEY` – application secret

### Database setup

This project does not use migrations. Ensure the database schema matches the
SQLAlchemy models before starting the app. You can create the initial tables
with:

```bash
python -c "from app.database import init_db; init_db()"  # run from the backend directory
```

## Running the app

From the `backend` directory run:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

## Running with Docker

To build and start the API in a container run:
```bash
cp backend/.env.example backend/.env
docker build -t projectcall -f backend/Dockerfile backend
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

## Frontend Components

The React frontend lives in the `frontend` directory. Notable reusable
components include:

 - `components/DocumentList.tsx` – lists uploaded attachments with
  download and delete options.
- `components/common/Stepper.tsx` – displays progress across application
  steps and is used by `ApplicationLayout`.

