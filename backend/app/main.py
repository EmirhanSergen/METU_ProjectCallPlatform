from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routes import api_router

app = FastAPI(title="Project Call Platform")

# Configure CORS to allow all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
def on_startup() -> None:
    # Ensure tables exist before the application starts. The project does not
    # use a migration tool so database schemas must be kept in sync manually.
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Call Platform"}
