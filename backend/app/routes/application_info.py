from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import application_info as crud
from ..crud import application as crud_application
from ..schemas import ApplicationInfoCreate, ApplicationInfoRead
from ..core.security import get_current_user
from ..core.enums import UserRole
from ..models import User

router = APIRouter(prefix="/application_infos", tags=["ApplicationInfo"])

@router.post('/', response_model=ApplicationInfoRead)
def create_application_info(
    data: ApplicationInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = crud_application.get_by_id(db, data.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=ApplicationInfoRead)
def read_application_info(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    application = crud_application.get_by_id(db, obj.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return obj

@router.get('/', response_model=list[ApplicationInfoRead])
def read_application_infos(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    infos = list(crud.get_all(db))
    if current_user.role in {UserRole.admin, UserRole.super_admin}:
        return infos
    result = []
    for obj in infos:
        application = crud_application.get_by_id(db, obj.application_id)
        if application and application.user_id == current_user.id:
            result.append(obj)
    return result

@router.put('/{obj_id}', response_model=ApplicationInfoRead)
def update_application_info(
    obj_id: uuid.UUID,
    data: ApplicationInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    application = crud_application.get_by_id(db, obj.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_application_info(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="ApplicationInfo not found")
    application = crud_application.get_by_id(db, obj.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    crud.delete(db, obj)
    return {"ok": True}
