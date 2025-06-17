from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import ethical_optional_table as crud
from ..schemas import EthicalOptionalTableCreate, EthicalOptionalTableRead

router = APIRouter(trailing_slash=False, prefix="/ethical_optional_tables", tags=["EthicalOptionalTable"])

@router.post('/', response_model=EthicalOptionalTableRead)
def create_ethical_optional_table(data: EthicalOptionalTableCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=EthicalOptionalTableRead)
def read_ethical_optional_table(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicalOptionalTable not found")
    return obj

@router.get('/', response_model=list[EthicalOptionalTableRead])
def read_ethical_optional_tables(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=EthicalOptionalTableRead)
def update_ethical_optional_table(obj_id: uuid.UUID, data: EthicalOptionalTableCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicalOptionalTable not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_ethical_optional_table(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicalOptionalTable not found")
    crud.delete(db, obj)
    return {'ok': True}
