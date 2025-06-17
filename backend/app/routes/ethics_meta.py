from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import ethics_meta as crud
from ..schemas import EthicsMetaCreate, EthicsMetaRead

router = APIRouter(trailing_slash=False, prefix="/ethics_metas", tags=["EthicsMeta"])

@router.post('/', response_model=EthicsMetaRead)
def create_ethics_meta(data: EthicsMetaCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=EthicsMetaRead)
def read_ethics_meta(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsMeta not found")
    return obj

@router.get('/', response_model=list[EthicsMetaRead])
def read_ethics_metas(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=EthicsMetaRead)
def update_ethics_meta(obj_id: uuid.UUID, data: EthicsMetaCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsMeta not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_ethics_meta(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsMeta not found")
    crud.delete(db, obj)
    return {'ok': True}
