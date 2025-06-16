from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import call_supervisor as crud
from ..schemas import CallSupervisorCreate, CallSupervisorRead

router = APIRouter(prefix="/call_supervisors", tags=["CallSupervisor"])

@router.post('/', response_model=CallSupervisorRead)
def create_call_supervisor(data: CallSupervisorCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallSupervisorRead)
def read_call_supervisor(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSupervisor not found")
    return obj

@router.get('/', response_model=list[CallSupervisorRead])
def read_call_supervisors(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallSupervisorRead)
def update_call_supervisor(obj_id: uuid.UUID, data: CallSupervisorCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSupervisor not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_call_supervisor(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSupervisor not found")
    crud.delete(db, obj)
    return {'ok': True}
