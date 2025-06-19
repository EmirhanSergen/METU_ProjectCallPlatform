from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import review_report as crud
from ..schemas import ReviewReportCreate, ReviewReportRead
from ..core.security import role_required
from ..core.enums import UserRole

router = APIRouter(prefix="/review_reports", tags=["ReviewReport"])

@router.post('/', response_model=ReviewReportRead)
@role_required(UserRole.reviewer)
def create_review_report(data: ReviewReportCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=ReviewReportRead)
@role_required(UserRole.reviewer)
def read_review_report(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ReviewReport not found")
    return obj

@router.get('/', response_model=list[ReviewReportRead])
@role_required(UserRole.reviewer)
def read_review_reports(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=ReviewReportRead)
@role_required(UserRole.reviewer)
def update_review_report(obj_id: uuid.UUID, data: ReviewReportCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ReviewReport not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.reviewer)
def delete_review_report(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ReviewReport not found")
    crud.delete(db, obj)
    return {'ok': True}
