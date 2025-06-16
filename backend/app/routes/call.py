from __future__ import annotations

import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import CallCreate, CallRead
from ..crud import call as crud_call

router = APIRouter(prefix="/calls", tags=["calls"])


@router.post("/", response_model=CallRead, status_code=status.HTTP_201_CREATED)
def create_call(call_in: CallCreate, db: Session = Depends(get_db)) -> CallRead:
    return crud_call.create_call(db, call_in)


@router.get("/", response_model=List[CallRead])
def list_calls(db: Session = Depends(get_db)) -> List[CallRead]:
    return crud_call.get_calls(db)


@router.get("/{call_id}", response_model=CallRead)
def read_call(call_id: uuid.UUID, db: Session = Depends(get_db)) -> CallRead:
    db_call = crud_call.get_call(db, call_id)
    if not db_call:
        raise HTTPException(status_code=404, detail="Call not found")
    return db_call


@router.put("/{call_id}", response_model=CallRead)
def update_call(call_id: uuid.UUID, call_in: CallCreate, db: Session = Depends(get_db)) -> CallRead:
    db_call = crud_call.get_call(db, call_id)
    if not db_call:
        raise HTTPException(status_code=404, detail="Call not found")
    return crud_call.update_call(db, db_call, call_in)


@router.delete("/{call_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_call(call_id: uuid.UUID, db: Session = Depends(get_db)) -> None:
    db_call = crud_call.get_call(db, call_id)
    if not db_call:
        raise HTTPException(status_code=404, detail="Call not found")
    crud_call.delete_call(db, db_call)
    return None
