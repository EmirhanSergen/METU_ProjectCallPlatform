from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import attachment as crud
from ..crud import application as crud_application
from ..schemas import AttachmentCreate, AttachmentRead
from ..core.security import get_current_user
from ..core.enums import UserRole
from ..models import User

router = APIRouter(prefix="/attachments", tags=["Attachment"])


@router.get('/application/{application_id}', response_model=list[AttachmentRead])
def read_attachments_by_application(
    application_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Return attachments belonging to a specific application."""
    application = crud_application.get_by_id(db, application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return list(crud.get_attachments_by_application_id(db, application_id))

@router.post('/', response_model=AttachmentRead)
def create_attachment(
    data: AttachmentCreate,
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

@router.get('/{obj_id}', response_model=AttachmentRead)
def read_attachment(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
    application = crud_application.get_by_id(db, obj.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return obj

@router.get('/', response_model=list[AttachmentRead])
def read_attachments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    attachments = list(crud.get_all(db))
    if current_user.role in {UserRole.admin, UserRole.super_admin}:
        return attachments
    result = []
    for obj in attachments:
        application = crud_application.get_by_id(db, obj.application_id)
        if application and application.user_id == current_user.id:
            result.append(obj)
    return result

@router.put('/{obj_id}', response_model=AttachmentRead)
def update_attachment(
    obj_id: uuid.UUID,
    data: AttachmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
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
def delete_attachment(
    obj_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
    application = crud_application.get_by_id(db, obj.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    crud.delete(db, obj)
    return {'ok': True}
