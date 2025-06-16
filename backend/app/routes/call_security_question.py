from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import call_security_question as crud
from ..schemas import CallSecurityQuestionCreate, CallSecurityQuestionRead

router = APIRouter(prefix="/call_security_questions", tags=["CallSecurityQuestion"])

@router.post('/', response_model=CallSecurityQuestionRead)
def create_call_security_question(data: CallSecurityQuestionCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallSecurityQuestionRead)
def read_call_security_question(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSecurityQuestion not found")
    return obj

@router.get('/', response_model=list[CallSecurityQuestionRead])
def read_call_security_questions(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallSecurityQuestionRead)
def update_call_security_question(obj_id: uuid.UUID, data: CallSecurityQuestionCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSecurityQuestion not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_call_security_question(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallSecurityQuestion not found")
    crud.delete(db, obj)
    return {'ok': True}
