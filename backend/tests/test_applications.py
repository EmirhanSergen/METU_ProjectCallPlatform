import os
import uuid

# Ensure settings before app import
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("SECRET_KEY", "test")

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.database import Base, engine, SessionLocal
from app.models import User, Application
from app.core.security import hash_password, create_access_token

client = TestClient(app)


def setup_function():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def create_user(db: Session, email: str) -> User:
    user = User(
        email=email,
        first_name="Test",
        last_name="User",
        password_hash=hash_password("pass"),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def test_read_my_applications_returns_only_owned():
    db = SessionLocal()
    user1 = create_user(db, "u1@example.com")
    user2 = create_user(db, "u2@example.com")

    app1 = Application(call_id=uuid.uuid4(), user_id=user1.id)
    app2 = Application(call_id=uuid.uuid4(), user_id=user1.id)
    app3 = Application(call_id=uuid.uuid4(), user_id=user2.id)
    db.add_all([app1, app2, app3])
    db.commit()
    db.close()

    token = create_access_token({"sub": str(user1.id), "role": user1.role})
    headers = {"Authorization": f"Bearer {token}"}

    response = client.get("/applications/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    ids = {item["id"] for item in data}
    assert ids == {str(app1.id), str(app2.id)}

