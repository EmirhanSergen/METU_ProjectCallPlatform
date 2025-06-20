from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import mobility_entry as crud
from ..crud import application_form as crud_application_form
from ..crud import application as crud_application
from ..schemas import MobilityEntryCreate, MobilityEntryRead
from ..core.security import get_current_user
from ..core.enums import UserRole
from ..models import User

router = APIRouter(prefix="/mobility_entries", tags=["MobilityEntry"])

@router.post('/', response_model=MobilityEntryRead)
def create_mobility_entry(
    data: MobilityEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    app_form = crud_application_form.get_by_id(db, data.application_form_id)
    if not app_form:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    application = crud_application.get_by_id(db, app_form.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=MobilityEntryRead)
def read_mobility_entry(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    app_form = crud_application_form.get_by_id(db, obj.application_form_id)
    if not app_form:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    application = crud_application.get_by_id(db, app_form.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return obj

@router.get('/', response_model=list[MobilityEntryRead])
def read_mobility_entries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    entries = list(crud.get_all(db))
    if current_user.role in {UserRole.admin, UserRole.super_admin}:
        return entries
    result = []
    for obj in entries:
        app_form = crud_application_form.get_by_id(db, obj.application_form_id)
        if not app_form:
            continue
        application = crud_application.get_by_id(db, app_form.application_id)
        if application and application.user_id == current_user.id:
            result.append(obj)
    return result


@router.get('/application_form/{application_form_id}', response_model=list[MobilityEntryRead])
def read_mobility_entries_by_application_form(
    application_form_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Return mobility entries belonging to a specific application form."""
    app_form = crud_application_form.get_by_id(db, application_form_id)
    if not app_form:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    application = crud_application.get_by_id(db, app_form.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return list(
        crud.get_mobility_entries_by_application_form_id(db, application_form_id)
    )

@router.put('/{obj_id}', response_model=MobilityEntryRead)
def update_mobility_entry(
    obj_id: uuid.UUID,
    data: MobilityEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    app_form = crud_application_form.get_by_id(db, obj.application_form_id)
    if not app_form:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    application = crud_application.get_by_id(db, app_form.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_mobility_entry(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="MobilityEntry not found")
    app_form = crud_application_form.get_by_id(db, obj.application_form_id)
    if not app_form:
        raise HTTPException(status_code=404, detail="ApplicationForm not found")
    application = crud_application.get_by_id(db, app_form.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    crud.delete(db, obj)
    return {"ok": True}
