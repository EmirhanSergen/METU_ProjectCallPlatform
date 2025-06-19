from fastapi import APIRouter, Depends, File, UploadFile, Response, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..services import file_service, pdf_service
from ..core.security import get_current_user
from ..models import User
from ..crud import application as crud_application, attachment as crud_attachment
from ..core.enums import UserRole

router = APIRouter(tags=["File"])


@router.post("/applications/{application_id}/upload_file")
def upload_file(
    application_id: uuid.UUID,
    upload: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = crud_application.get_by_id(db, application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    return file_service.save_attachment_file(db, application_id, upload)


@router.get("/files/{attachment_id}")
def get_file(
    attachment_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    attachment = crud_attachment.get_by_id(db, attachment_id)
    if not attachment:
        raise HTTPException(status_code=404, detail="File not found")
    application = crud_application.get_by_id(db, attachment.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    filename, data = attachment.doc_name or "file", attachment.file_blob
    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return Response(
        content=data, media_type="application/octet-stream", headers=headers
    )


@router.get("/applications/{application_id}/export_pdf")
def export_application_pdf(
    application_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate a simple PDF for the application and return it."""
    application = crud_application.get_by_id(db, application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    if (
        application.user_id != current_user.id
        and current_user.role not in {UserRole.admin, UserRole.super_admin}
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    pdf_data = pdf_service.create_simple_pdf(f"Application: {application_id}")
    headers = {
        "Content-Disposition": f'attachment; filename="application_{application_id}.pdf"'
    }
    return Response(content=pdf_data, media_type="application/pdf", headers=headers)
