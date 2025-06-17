from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_call_templates_requires_auth():
    response = client.get('/call_templates')
    assert response.status_code in {401, 403}
