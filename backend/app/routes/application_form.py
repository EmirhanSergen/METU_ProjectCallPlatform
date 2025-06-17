from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import application_form as crud
from ..schemas import ApplicationFormCreate, ApplicationFormRead

router = APIRouter(trailing_slash=False, prefix="/application_forms", tags=["ApplicationForm"])

@router.post('/', response_model=ApplicationFormRead)
def create_application_form(data: ApplicationFormCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=ApplicationFormRead)
def read_application_form(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    return obj

@router.get('/', response_model=list[ApplicationFormRead])
def read_application_forms(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=ApplicationFormRead)
def update_application_form(obj_id: uuid.UUID, data: ApplicationFormCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_application_form(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    crud.delete(db, obj)
    return {'ok': True}
