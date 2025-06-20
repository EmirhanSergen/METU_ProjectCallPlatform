from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_misuse as crud
from ..crud import application_form as crud_application_form
from ..crud import application as crud_application
from ..schemas import SecurityMisuseCreate, SecurityMisuseRead
from ..core.security import get_current_user
from ..core.enums import UserRole
from ..models import User

router = APIRouter(prefix="/security_misuses", tags=["SecurityMisuse"])

@router.post('/', response_model=SecurityMisuseRead)
def create_security_misuse(
    data: SecurityMisuseCreate,
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

@router.get('/{obj_id}', response_model=SecurityMisuseRead)
def read_security_misuse(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
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

@router.get('/', response_model=list[SecurityMisuseRead])
def read_security_misuses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    misuses = list(crud.get_all(db))
    if current_user.role in {UserRole.admin, UserRole.super_admin}:
        return misuses
    result = []
    for obj in misuses:
        app_form = crud_application_form.get_by_id(db, obj.application_form_id)
        if not app_form:
            continue
        application = crud_application.get_by_id(db, app_form.application_id)
        if application and application.user_id == current_user.id:
            result.append(obj)
    return result

@router.put('/{obj_id}', response_model=SecurityMisuseRead)
def update_security_misuse(
    obj_id: uuid.UUID,
    data: SecurityMisuseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
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
def delete_security_misuse(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityMisuse not found")
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
