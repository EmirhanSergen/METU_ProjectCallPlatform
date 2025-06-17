from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_other as crud
from ..schemas import SecurityOtherCreate, SecurityOtherRead

router = APIRouter(prefix="/security_others", tags=["SecurityOther"])

@router.post('/', response_model=SecurityOtherRead)
def create_security_other(data: SecurityOtherCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityOtherRead)
def read_security_other(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityOther not found")
    return obj

@router.get('/', response_model=list[SecurityOtherRead])
def read_security_others(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityOtherRead)
def update_security_other(obj_id: uuid.UUID, data: SecurityOtherCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityOther not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_security_other(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityOther not found")
    crud.delete(db, obj)
    return {'ok': True}
