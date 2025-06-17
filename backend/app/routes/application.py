from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import application as crud
from ..schemas import ApplicationCreate, ApplicationRead
from ..core.security import get_current_user

router = APIRouter(trailing_slash=False, prefix="/applications", tags=["Application"])

@router.post('/', response_model=ApplicationRead)
def create_application(
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=ApplicationRead)
def read_application(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    return obj

@router.get('/', response_model=list[ApplicationRead])
def read_applications(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=ApplicationRead)
def update_application(
    obj_id: uuid.UUID,
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_application(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    crud.delete(db, obj)
    return {'ok': True}
