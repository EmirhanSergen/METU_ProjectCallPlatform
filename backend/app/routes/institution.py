from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import institution as crud
from ..schemas import InstitutionCreate, InstitutionRead

router = APIRouter(trailing_slash=False, prefix="/institutions", tags=["Institution"])

@router.post('/', response_model=InstitutionRead)
def create_institution(data: InstitutionCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=InstitutionRead)
def read_institution(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Institution not found")
    return obj

@router.get('/', response_model=list[InstitutionRead])
def read_institutions(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=InstitutionRead)
def update_institution(obj_id: uuid.UUID, data: InstitutionCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Institution not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_institution(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Institution not found")
    crud.delete(db, obj)
    return {'ok': True}
