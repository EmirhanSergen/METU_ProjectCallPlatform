import os
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.database import Base, get_db
from backend.app.routes import api_router
from backend.app.crud import user as crud_user, application as crud_application, attachment as crud_attachment
from backend.app.core.security import create_access_token
from backend.app.core.enums import UserRole

os.environ.setdefault("SECRET_KEY", "test-secret")

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(api_router)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def create_user(db, email="user@example.com"):
    return crud_user.create(db, {
        "email": email,
        "first_name": "John",
        "last_name": "Doe",
        "password": "secret",
    })


def create_application(db, user_id):
    return crud_application.create(db, {"user_id": user_id})


def create_attachment(db, application_id):
    return crud_attachment.create(db, {
        "application_id": application_id,
        "doc_name": "doc.pdf",
        "file_path": "doc.pdf",
        "file_blob": b"data",
    })


def auth_headers(user):
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {"Authorization": f"Bearer {token}"}


def test_upload_requires_authentication():
    with TestingSessionLocal() as db:
        user = create_user(db)
        app_obj = create_application(db, user.id)
    resp = client.post(f"/applications/{app_obj.id}/upload_file", files={"upload": ("doc.pdf", b"x", "application/pdf")})
    assert resp.status_code == 401


def test_get_file_requires_authentication():
    with TestingSessionLocal() as db:
        user = create_user(db)
        app_obj = create_application(db, user.id)
        att = create_attachment(db, app_obj.id)
    resp = client.get(f"/files/{att.id}")
    assert resp.status_code == 401


def test_upload_forbidden_for_non_owner():
    with TestingSessionLocal() as db:
        owner = create_user(db, "owner@example.com")
        other = create_user(db, "other@example.com")
        app_obj = create_application(db, owner.id)
    headers = auth_headers(other)
    resp = client.post(
        f"/applications/{app_obj.id}/upload_file",
        files={"upload": ("doc.pdf", b"x", "application/pdf")},
        headers=headers,
    )
    assert resp.status_code == 403


def test_get_file_forbidden_for_non_owner():
    with TestingSessionLocal() as db:
        owner = create_user(db, "owner2@example.com")
        other = create_user(db, "other2@example.com")
        app_obj = create_application(db, owner.id)
        att = create_attachment(db, app_obj.id)
    headers = auth_headers(other)
    resp = client.get(f"/files/{att.id}", headers=headers)
    assert resp.status_code == 403
