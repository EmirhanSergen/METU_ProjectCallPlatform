from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
import uuid

from ..database import get_db
from ..crud import application as crud
from ..schemas import ApplicationCreate, ApplicationRead, ApplicationOut
from ..core.security import get_current_user, role_required
from ..core.enums import UserRole
from ..models import User, Application

router = APIRouter(prefix="/applications", tags=["Application"])

@router.post('/', response_model=ApplicationRead)
@role_required(UserRole.applicant)
def create_application(
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """Create an application for the current user.

    The ``user_id`` field of the incoming payload is ignored and replaced with
    the id of ``current_user``.
    """
    data_dict = data.dict(exclude={"user_id"})
    data_dict["user_id"] = current_user.id
    return crud.create(db, data_dict)

@router.get('/me', response_model=list[ApplicationOut])
def read_my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Application)
        .options(joinedload(Application.user))
        .filter(Application.user_id == current_user.id)
        .all()
    )

@router.get('/{obj_id}', response_model=ApplicationRead)
def read_application(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        obj.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return obj

@router.get('/', response_model=list[ApplicationRead])
def read_applications(
    call_id: uuid.UUID | None = None,
    db: Session = Depends(get_db),
):
    if call_id is not None:
        return list(crud.get_applications_by_call_id(db, str(call_id)))
    return list(crud.get_all(db))


@router.put('/{obj_id}', response_model=ApplicationRead)
def update_application(
    obj_id: uuid.UUID,
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    if obj.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    data_dict = data.dict(exclude={"user_id"})
    data_dict["user_id"] = current_user.id
    if data_dict.get("completed_steps") is None:
        # Preserve existing completed steps if client omits the field
        data_dict["completed_steps"] = obj.completed_steps
    return crud.update(db, obj, data_dict)


@router.patch('/{obj_id}', response_model=ApplicationRead)
def partial_update_application(
    obj_id: uuid.UUID,
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """Update only provided fields for the application."""
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    if obj.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    data_dict = data.dict(exclude_unset=True, exclude={"user_id"})
    if not data_dict:
        return obj
    return crud.update(db, obj, data_dict)

@router.delete('/{obj_id}')
def delete_application(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Application not found")
    if obj.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    crud.delete(db, obj)
    return {"ok": True}
