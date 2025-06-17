from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import supervisor as crud
from ..schemas import SupervisorCreate, SupervisorRead

router = APIRouter(trailing_slash=False, prefix="/supervisors", tags=["Supervisor"])

@router.post('/', response_model=SupervisorRead)
def create_supervisor(data: SupervisorCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SupervisorRead)
def read_supervisor(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Supervisor not found")
    return obj

@router.get('/', response_model=list[SupervisorRead])
def read_supervisors(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SupervisorRead)
def update_supervisor(obj_id: uuid.UUID, data: SupervisorCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Supervisor not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_supervisor(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Supervisor not found")
    crud.delete(db, obj)
    return {'ok': True}
