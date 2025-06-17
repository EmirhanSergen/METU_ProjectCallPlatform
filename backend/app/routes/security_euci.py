from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_euci as crud
# Pydantic schemas expose classes with the acronym EUCI fully capitalized. The
# previous import used `SecurityEuciCreate`/`SecurityEuciRead`, which do not
# exist and caused an `ImportError` during application startup. Import the
# correctly named classes instead.
from ..schemas import SecurityEUCCreate, SecurityEUCIRead

router = APIRouter(trailing_slash=False, prefix="/security_eucis", tags=["SecurityEuci"])

@router.post('/', response_model=SecurityEUCIRead)
def create_security_euci(data: SecurityEUCCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityEUCIRead)
def read_security_euci(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityEuci not found")
    return obj

@router.get('/', response_model=list[SecurityEUCIRead])
def read_security_eucis(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityEUCIRead)
def update_security_euci(obj_id: uuid.UUID, data: SecurityEUCCreate, db: Session = Depends(get_db)):
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
