from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import call as crud
from ..schemas import CallCreate, CallRead
from ..core.security import role_required
from ..core.enums import UserRole

router = APIRouter(prefix="/calls", tags=["Call"])

@router.post('/', response_model=CallRead)
def create_call(data: CallCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallRead)
def read_call(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    return obj

@router.get('/', response_model=list[CallRead])
def read_calls(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallRead)
@role_required(UserRole.super_admin)
def update_call(obj_id: uuid.UUID, data: CallCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.super_admin)
def delete_call(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    crud.delete(db, obj)
    return {'ok': True}
