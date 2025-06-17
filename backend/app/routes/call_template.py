from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..core.security import role_required
from ..core.enums import UserRole

from ..database import get_db
from ..crud import call_template as crud
from ..schemas import CallTemplateCreate, CallTemplateRead

router = APIRouter(trailing_slash=False, prefix="/call_templates", tags=["CallTemplate"])

@router.post('/', response_model=CallTemplateRead)
@role_required(UserRole.admin, UserRole.super_admin)
def create_call_template(data: CallTemplateCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallTemplateRead)
@role_required(UserRole.admin, UserRole.super_admin)
def read_call_template(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallTemplate not found")
    return obj

@router.get('/', response_model=list[CallTemplateRead])
@role_required(UserRole.admin, UserRole.super_admin)
def read_call_templates(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallTemplateRead)
@role_required(UserRole.admin, UserRole.super_admin)
def update_call_template(obj_id: uuid.UUID, data: CallTemplateCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallTemplate not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.admin, UserRole.super_admin)
def delete_call_template(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallTemplate not found")
    crud.delete(db, obj)
    return {'ok': True}
