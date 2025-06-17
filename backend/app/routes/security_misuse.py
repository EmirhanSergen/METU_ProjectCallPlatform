from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_misuse as crud
from ..schemas import SecurityMisuseCreate, SecurityMisuseRead

router = APIRouter(prefix="/security_misuses", tags=["SecurityMisuse"])

@router.post('/', response_model=SecurityMisuseRead)
def create_security_misuse(data: SecurityMisuseCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityMisuseRead)
def read_security_misuse(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
    return obj

@router.get('/', response_model=list[SecurityMisuseRead])
def read_security_misuses(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityMisuseRead)
def update_security_misuse(obj_id: uuid.UUID, data: SecurityMisuseCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_security_misuse(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
    crud.delete(db, obj)
    return {'ok': True}
