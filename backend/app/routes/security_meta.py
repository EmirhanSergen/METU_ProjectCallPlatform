from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_meta as crud
from ..schemas import SecurityMetaCreate, SecurityMetaRead

router = APIRouter(trailing_slash=False, prefix="/security_metas", tags=["SecurityMeta"])

@router.post('/', response_model=SecurityMetaRead)
def create_security_meta(data: SecurityMetaCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityMetaRead)
def read_security_meta(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMeta not found")
    return obj

@router.get('/', response_model=list[SecurityMetaRead])
def read_security_metas(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityMetaRead)
def update_security_meta(obj_id: uuid.UUID, data: SecurityMetaCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMeta not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_security_meta(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMeta not found")
    crud.delete(db, obj)
    return {'ok': True}
