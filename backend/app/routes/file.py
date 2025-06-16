from fastapi import APIRouter, Depends, File, UploadFile, Response
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..services import file_service
from ..core.security import get_current_user

router = APIRouter(tags=["File"])


@router.post("/applications/{application_id}/upload_file")
def upload_file(
    application_id: uuid.UUID,
    upload: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    return file_service.save_attachment_file(db, application_id, upload)


@router.get("/files/{attachment_id}")
def get_file(
    attachment_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    filename, data = file_service.get_attachment_file(db, attachment_id)
    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return Response(
        content=data, media_type="application/octet-stream", headers=headers
    )
