from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..crud import user as crud_user
from ..schemas import UserCreate, UserRead, Token
from ..core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


class LoginData(BaseModel):
    email: str
    password: str


@router.post("/register", response_model=UserRead)
def register(data: UserCreate, db: Session = Depends(get_db)):
    if crud_user.get_by_email(db, data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = data.dict()
    user_dict["password_hash"] = hash_password(user_dict.pop("password"))
    return crud_user.create(db, user_dict)


@router.post("/login", response_model=Token)
def login(data: LoginData, db: Session = Depends(get_db)):
    user = crud_user.get_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {"access_token": token, "token_type": "bearer"}
