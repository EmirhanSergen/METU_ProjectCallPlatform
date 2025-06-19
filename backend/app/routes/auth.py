from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..crud import user as crud_user
from ..schemas import UserCreate, UserRead, Token, PasswordResetRequest
from ..core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


class LoginData(BaseModel):
    email: str
    password: str


@router.post("/password_reset")
def request_password_reset(data: PasswordResetRequest, db: Session = Depends(get_db)):
    """Initiate a password reset if the email exists.

    The response is always successful to avoid leaking which emails are
    registered. Actual email sending is left as a future implementation."""
    user = crud_user.get_by_email(db, data.email)
    if user:
        # TODO: send password reset email
        pass
    return {"ok": True}


@router.post("/register", response_model=UserRead)
def register(data: UserCreate, db: Session = Depends(get_db)):
    if crud_user.get_by_email(db, data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create(db, data)


@router.post("/login", response_model=Token)
def login(data: LoginData, db: Session = Depends(get_db)):
    user = crud_user.get_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {"access_token": token, "token_type": "bearer"}
