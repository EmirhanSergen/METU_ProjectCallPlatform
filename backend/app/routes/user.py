from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import user as crud
from ..schemas import UserCreate, UserRead
from ..core.security import role_required
from ..core.enums import UserRole

router = APIRouter(trailing_slash=False, prefix="/users", tags=["User"])

@router.post('/', response_model=UserRead)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_by_email(db, data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create(db, data)

@router.get('/{obj_id}', response_model=UserRead)
def read_user(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    return obj

@router.get('/', response_model=list[UserRead])
@role_required(UserRole.admin, UserRole.super_admin)
def read_users(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=UserRead)
@role_required(UserRole.super_admin)
def update_user(obj_id: uuid.UUID, data: UserCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.super_admin)
def delete_user(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete(db, obj)
    return {'ok': True}
