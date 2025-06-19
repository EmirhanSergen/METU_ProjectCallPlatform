from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_patch_application_requires_auth():
    response = client.patch('/applications/123', json={})
    assert response.status_code in {401, 403}

