from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import application_info as crud
from ..schemas import ApplicationInfoCreate, ApplicationInfoRead

router = APIRouter(prefix="/application_infos", tags=["ApplicationInfo"])

@router.post('/', response_model=ApplicationInfoRead)
def create_application_info(data: ApplicationInfoCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=ApplicationInfoRead)
def read_application_info(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    return obj

@router.get('/', response_model=list[ApplicationInfoRead])
def read_application_infos(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=ApplicationInfoRead)
def update_application_info(obj_id: uuid.UUID, data: ApplicationInfoCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_application_info(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    crud.delete(db, obj)
    return {'ok': True}
