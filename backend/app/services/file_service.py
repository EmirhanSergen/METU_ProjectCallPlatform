"""Service utilities for handling file uploads."""
from __future__ import annotations

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
import uuid

from .. import crud
from ..config import get_settings

settings = get_settings()

# Supported MIME types configured via environment variable
ALLOWED_MIME_TYPES = set(settings.ALLOWED_MIME_TYPES.split(","))


def validate_mime_type(upload_file: UploadFile) -> None:
    """Ensure uploaded file is a supported type."""
    if upload_file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")


def save_attachment_file(
    db: Session, application_id: uuid.UUID, upload_file: UploadFile
):
    """Create an Attachment and store the binary data."""
    validate_mime_type(upload_file)
    data = {
        "application_id": application_id,
        "doc_name": upload_file.filename,
        "file_path": upload_file.filename,
    }
    attachment = crud.attachment.create(db, data)
    attachment.file_blob = upload_file.file.read()
    db.commit()
    db.refresh(attachment)
    return attachment


def get_attachment_file(db: Session, attachment_id: uuid.UUID) -> tuple[str, bytes]:
    attachment = crud.attachment.get_by_id(db, attachment_id)
    if not attachment:
        raise HTTPException(status_code=404, detail="File not found")
    return attachment.doc_name or "file", attachment.file_blob
