import os
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.database import Base, get_db
from backend.app.routes import api_router
from backend.app.core.security import verify_password
from backend.app.models import User

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


def test_password_hashed_and_verifiable():
    payload = {
        "email": "verify@example.com",
        "first_name": "Alice",
        "last_name": "Smith",
        "password": "mypassword"
    }

    response = client.post("/users/", json=payload)
    assert response.status_code == 200

    db = TestingSessionLocal()
    try:
        user = db.query(User).filter(User.email == payload["email"]).first()
        assert user is not None
        assert user.password_hash != payload["password"]
        assert verify_password(payload["password"], user.password_hash)
    finally:
        db.close()

