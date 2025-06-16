from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import academic_reference as crud
from ..schemas import AcademicReferenceCreate, AcademicReferenceRead

router = APIRouter(prefix="/academic_references", tags=["AcademicReference"])

@router.post('/', response_model=AcademicReferenceRead)
def create_academic_reference(data: AcademicReferenceCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=AcademicReferenceRead)
def read_academic_reference(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicReference not found")
    return obj

@router.get('/', response_model=list[AcademicReferenceRead])
def read_academic_references(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=AcademicReferenceRead)
def update_academic_reference(obj_id: uuid.UUID, data: AcademicReferenceCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicReference not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_academic_reference(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicReference not found")
    crud.delete(db, obj)
    return {'ok': True}
