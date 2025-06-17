from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import academic_portfolio as crud
from ..schemas import AcademicPortfolioCreate, AcademicPortfolioRead

router = APIRouter(trailing_slash=False, prefix="/academic_portfolios", tags=["AcademicPortfolio"])

@router.post('/', response_model=AcademicPortfolioRead)
def create_academic_portfolio(data: AcademicPortfolioCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=AcademicPortfolioRead)
def read_academic_portfolio(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicPortfolio not found")
    return obj

@router.get('/', response_model=list[AcademicPortfolioRead])
def read_academic_portfolios(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=AcademicPortfolioRead)
def update_academic_portfolio(obj_id: uuid.UUID, data: AcademicPortfolioCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicPortfolio not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_academic_portfolio(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="AcademicPortfolio not found")
    crud.delete(db, obj)
    return {'ok': True}
