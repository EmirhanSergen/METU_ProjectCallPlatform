from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import ethics_issue as crud
from ..schemas import EthicsIssueCreate, EthicsIssueRead

router = APIRouter(prefix="/ethics_issues", tags=["EthicsIssue"])

@router.post('/', response_model=EthicsIssueRead)
def create_ethics_issue(data: EthicsIssueCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=EthicsIssueRead)
def read_ethics_issue(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsIssue not found")
    return obj

@router.get('/', response_model=list[EthicsIssueRead])
def read_ethics_issues(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=EthicsIssueRead)
def update_ethics_issue(obj_id: uuid.UUID, data: EthicsIssueCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsIssue not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_ethics_issue(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="EthicsIssue not found")
    crud.delete(db, obj)
    return {'ok': True}
