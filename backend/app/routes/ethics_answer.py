from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import ethics_answer as crud
from ..schemas import EthicsAnswerCreate, EthicsAnswerRead

router = APIRouter(prefix="/ethics_answers", tags=["EthicsAnswer"])

@router.post('/', response_model=EthicsAnswerRead)
def create_ethics_answer(data: EthicsAnswerCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=EthicsAnswerRead)
def read_ethics_answer(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsAnswer not found")
    return obj

@router.get('/', response_model=list[EthicsAnswerRead])
def read_ethics_answers(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=EthicsAnswerRead)
def update_ethics_answer(obj_id: uuid.UUID, data: EthicsAnswerCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsAnswer not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_ethics_answer(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsAnswer not found")
    crud.delete(db, obj)
    return {'ok': True}
