from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_euci as crud
from ..schemas import SecurityEuciCreate, SecurityEuciRead

router = APIRouter(prefix="/security_eucis", tags=["SecurityEuci"])

@router.post('/', response_model=SecurityEuciRead)
def create_security_euci(data: SecurityEuciCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityEuciRead)
def read_security_euci(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityEuci not found")
    return obj

@router.get('/', response_model=list[SecurityEuciRead])
def read_security_eucis(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityEuciRead)
def update_security_euci(obj_id: uuid.UUID, data: SecurityEuciCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityEuci not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_security_euci(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityEuci not found")
    crud.delete(db, obj)
    return {'ok': True}
