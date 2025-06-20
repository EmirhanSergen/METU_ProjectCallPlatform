from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import security_answer as crud
from ..crud import application_form as crud_application_form
from ..crud import application as crud_application
from ..schemas import SecurityAnswerCreate, SecurityAnswerRead
from ..core.security import get_current_user
from ..core.enums import UserRole
from ..models import User

router = APIRouter(prefix="/security_answers", tags=["SecurityAnswer"])

@router.post('/', response_model=SecurityAnswerRead)
def create_security_answer(
    data: SecurityAnswerCreate,
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

@router.get('/{obj_id}', response_model=SecurityAnswerRead)
def read_security_answer(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
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

@router.get('/', response_model=list[SecurityAnswerRead])
def read_security_answers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    answers = list(crud.get_all(db))
    if current_user.role in {UserRole.admin, UserRole.super_admin}:
        return answers
    result = []
    for obj in answers:
        app_form = crud_application_form.get_by_id(db, obj.application_form_id)
        if not app_form:
            continue
        application = crud_application.get_by_id(db, app_form.application_id)
        if application and application.user_id == current_user.id:
            result.append(obj)
    return result

@router.put('/{obj_id}', response_model=SecurityAnswerRead)
def update_security_answer(
    obj_id: uuid.UUID,
    data: SecurityAnswerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
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
def delete_security_answer(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="SecurityAnswer not found")
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
