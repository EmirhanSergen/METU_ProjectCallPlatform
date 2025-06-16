from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import suggested_reference as crud
from ..schemas import SuggestedReferenceCreate, SuggestedReferenceRead

router = APIRouter(prefix="/suggested_references", tags=["SuggestedReference"])

@router.post('/', response_model=SuggestedReferenceRead)
def create_suggested_reference(data: SuggestedReferenceCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SuggestedReferenceRead)
def read_suggested_reference(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SuggestedReference not found")
    return obj

@router.get('/', response_model=list[SuggestedReferenceRead])
def read_suggested_references(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SuggestedReferenceRead)
def update_suggested_reference(obj_id: uuid.UUID, data: SuggestedReferenceCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SuggestedReference not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_suggested_reference(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SuggestedReference not found")
    crud.delete(db, obj)
    return {'ok': True}
