from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import mobility_entry as crud
from ..schemas import MobilityEntryCreate, MobilityEntryRead

router = APIRouter(prefix="/mobility_entrys", tags=["MobilityEntry"])

@router.post('/', response_model=MobilityEntryRead)
def create_mobility_entry(data: MobilityEntryCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=MobilityEntryRead)
def read_mobility_entry(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    return obj

@router.get('/', response_model=list[MobilityEntryRead])
def read_mobility_entrys(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=MobilityEntryRead)
def update_mobility_entry(obj_id: uuid.UUID, data: MobilityEntryCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_mobility_entry(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    crud.delete(db, obj)
    return {'ok': True}
