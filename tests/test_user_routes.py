import os
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.database import Base, get_db
from backend.app.routes import api_router

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

def test_create_user_duplicate_email():
    payload = {
        "email": "user@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "secret"
    }
    response = client.post("/users/", json=payload)
    assert response.status_code == 200

    duplicate = client.post("/users/", json=payload)
    assert duplicate.status_code == 400
    assert duplicate.json()["detail"] == "Email already registered"


def test_update_user_timestamp_changes():
    payload = {
        "email": "timestamp@example.com",
        "first_name": "Time",
        "last_name": "Stamp",
        "password": "secret",
    }

    response = client.post("/users/", json=payload)
    assert response.status_code == 200
    user = response.json()
    user_id = user["id"]
    original_updated = user["updated_at"]

    update_payload = payload | {"first_name": "New"}
    update_response = client.put(f"/users/{user_id}", json=update_payload)
    assert update_response.status_code == 200
    updated_user = update_response.json()

    assert updated_user["updated_at"] != original_updated

