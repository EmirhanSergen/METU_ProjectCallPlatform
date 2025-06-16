from fastapi import FastAPI

from .database import init_db
from .routes import api_router

app = FastAPI(title="Project Call Platform")


@app.on_event("startup")
def on_startup() -> None:
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Call Platform"}

app.include_router(api_router)
