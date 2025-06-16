from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import call_ethics_question as crud
from ..schemas import CallEthicsQuestionCreate, CallEthicsQuestionRead

router = APIRouter(prefix="/call_ethics_questions", tags=["CallEthicsQuestion"])

@router.post('/', response_model=CallEthicsQuestionRead)
def create_call_ethics_question(data: CallEthicsQuestionCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallEthicsQuestionRead)
def read_call_ethics_question(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallEthicsQuestion not found")
    return obj

@router.get('/', response_model=list[CallEthicsQuestionRead])
def read_call_ethics_questions(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallEthicsQuestionRead)
def update_call_ethics_question(obj_id: uuid.UUID, data: CallEthicsQuestionCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallEthicsQuestion not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_call_ethics_question(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="CallEthicsQuestion not found")
    crud.delete(db, obj)
    return {'ok': True}
