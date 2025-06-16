import os
import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
from app.main import app
from app.core.security import create_access_token
from app.core.enums import UserRole

client = TestClient(app)

def test_call_create_requires_admin():
    token = create_access_token({"sub": "u1", "role": UserRole.applicant})
    resp = client.post("/calls/", json={"title": "t"}, headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 403

def test_call_create_unauthenticated():
    resp = client.post("/calls/", json={"title": "t"})
    assert resp.status_code == 401

def test_application_create_requires_login():
    resp = client.post("/applications/", json={})
    assert resp.status_code == 401

def test_upload_file_requires_login(tmp_path):
    file_path = tmp_path / "test.txt"
    file_path.write_text("hello")
    with file_path.open("rb") as f:
        resp = client.post(
            f"/applications/00000000-0000-0000-0000-000000000000/upload_file",
            files={"upload": ("test.txt", f, "text/plain")},
        )
    assert resp.status_code == 401
