from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALLOWED_MIME_TYPES: str = "application/pdf,image/jpeg,image/png"

    ALGORITHM: str = "HS256"

    class Config:
        env_file = '.env'

def get_settings() -> Settings:
    return Settings()
