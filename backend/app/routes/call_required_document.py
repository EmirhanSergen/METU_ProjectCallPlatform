from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import call_required_document as crud
from ..schemas import CallRequiredDocumentCreate, CallRequiredDocumentRead

router = APIRouter(prefix="/call_required_documents", tags=["CallRequiredDocument"])

@router.post('/', response_model=CallRequiredDocumentRead)
def create_call_required_document(data: CallRequiredDocumentCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallRequiredDocumentRead)
def read_call_required_document(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallRequiredDocument not found")
    return obj

@router.get('/', response_model=list[CallRequiredDocumentRead])
def read_call_required_documents(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallRequiredDocumentRead)
def update_call_required_document(obj_id: uuid.UUID, data: CallRequiredDocumentCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallRequiredDocument not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_call_required_document(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallRequiredDocument not found")
    crud.delete(db, obj)
    return {'ok': True}
