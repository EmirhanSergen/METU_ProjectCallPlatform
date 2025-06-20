from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..core.security import role_required
from ..core.enums import UserRole, CallStatus

from ..database import get_db
from ..crud import call as crud
from ..schemas import CallCreate, CallRead

router = APIRouter(prefix="/call", tags=["Call"])

@router.post('/', response_model=CallRead)
@role_required(UserRole.admin, UserRole.super_admin)
def create_call(data: CallCreate, db: Session = Depends(get_db)):
    if (
        data.status == CallStatus.PUBLISHED
        and crud.get_by_status(db, CallStatus.PUBLISHED)
    ):
        raise HTTPException(
            status_code=400,
            detail="Another call is already published. Set status to a different value.",
        )
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=CallRead)
def read_call(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    return obj

@router.get('/', response_model=list[CallRead])
def read_calls(
    status: CallStatus | None = None,
    db: Session = Depends(get_db),
):
    if status is not None:
        return list(crud.get_by_status(db, status))
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=CallRead)
@role_required(UserRole.admin, UserRole.super_admin)
def update_call(obj_id: uuid.UUID, data: CallCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    if (
        data.status == CallStatus.PUBLISHED
        and crud.get_by_status(db, CallStatus.PUBLISHED)
        and obj.status != CallStatus.PUBLISHED
    ):
        raise HTTPException(
            status_code=400,
            detail="Another call is already published. Set status to a different value.",
        )
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
@role_required(UserRole.super_admin)
def delete_call(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Call not found")
    crud.delete(db, obj)
    return {'ok': True}
