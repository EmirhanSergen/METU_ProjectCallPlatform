from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_answer as crud
from ..schemas import SecurityAnswerCreate, SecurityAnswerRead

router = APIRouter(prefix="/security_answers", tags=["SecurityAnswer"])

@router.post('/', response_model=SecurityAnswerRead)
def create_security_answer(data: SecurityAnswerCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=SecurityAnswerRead)
def read_security_answer(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
    return obj

@router.get('/', response_model=list[SecurityAnswerRead])
def read_security_answers(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=SecurityAnswerRead)
def update_security_answer(obj_id: uuid.UUID, data: SecurityAnswerCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_security_answer(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
    crud.delete(db, obj)
    return {'ok': True}
