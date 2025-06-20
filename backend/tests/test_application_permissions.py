from fastapi.testclient import TestClient
from app.main import app
from app.core.security import get_current_user
from app.database import get_db
from app.core.enums import UserRole
from app import crud
import uuid

client = TestClient(app)

class DummyUser:
    def __init__(self, id, role):
        self.id = id
        self.role = role

class DummyApplication:
    def __init__(self, id, user_id):
        self.id = id
        self.user_id = user_id


def test_read_applications_forbidden_for_non_admin():
    app.dependency_overrides[get_current_user] = lambda: DummyUser(uuid.uuid4(), UserRole.applicant)
    response = client.get('/applications')
    assert response.status_code == 403
    app.dependency_overrides.clear()


def test_read_application_forbidden_for_other_user(monkeypatch):
    user_id = uuid.uuid4()
    other_id = uuid.uuid4()

    app.dependency_overrides[get_current_user] = lambda: DummyUser(user_id, UserRole.applicant)

    def override_get_db():
        yield None
    app.dependency_overrides[get_db] = override_get_db

    monkeypatch.setattr(crud.application, 'get_by_id', lambda db, obj_id: DummyApplication(obj_id, other_id))

    response = client.get(f'/applications/{uuid.uuid4()}')
    assert response.status_code == 403
    app.dependency_overrides.clear()
