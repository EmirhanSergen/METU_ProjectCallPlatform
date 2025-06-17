from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..core.security import role_required
from ..core.enums import UserRole

from ..database import get_db
from ..crud import call_institution as crud
from ..schemas import CallInstitutionCreate, CallInstitutionRead

router = APIRouter(prefix="/call_institutions", tags=["CallInstitution"])

@router.post('/', response_model=CallInstitutionRead)
@role_required(UserRole.admin, UserRole.super_admin)
def create_call_institution(data: CallInstitutionCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallInstitutionRead)
@role_required(UserRole.admin, UserRole.super_admin)
def read_call_institution(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallInstitution not found")
    return obj

@router.get('/', response_model=list[CallInstitutionRead])
@role_required(UserRole.admin, UserRole.super_admin)
def read_call_institutions(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallInstitutionRead)
@role_required(UserRole.admin, UserRole.super_admin)
def update_call_institution(obj_id: uuid.UUID, data: CallInstitutionCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallInstitution not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.admin, UserRole.super_admin)
def delete_call_institution(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallInstitution not found")
    crud.delete(db, obj)
    return {'ok': True}
