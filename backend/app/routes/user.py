from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import user as crud
from ..schemas import UserCreate, UserRead

router = APIRouter(prefix="/users", tags=["User"])

@router.post('/', response_model=UserRead)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=UserRead)
def read_user(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    return obj

@router.get('/', response_model=list[UserRead])
def read_users(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=UserRead)
def update_user(obj_id: uuid.UUID, data: UserCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_user(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete(db, obj)
    return {'ok': True}
