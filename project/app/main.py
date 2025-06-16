from fastapi import FastAPI

app = FastAPI(title="Project Call Platform")

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Call Platform"}
