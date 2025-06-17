from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from ..database import get_db
from ..crud import attachment as crud
from ..schemas import AttachmentCreate, AttachmentRead

router = APIRouter(trailing_slash=False, prefix="/attachments", tags=["Attachment"])


@router.get('/application/{application_id}', response_model=list[AttachmentRead])
def read_attachments_by_application(
    application_id: uuid.UUID, db: Session = Depends(get_db)
):
    """Return attachments belonging to a specific application."""
    return list(crud.get_attachments_by_application_id(db, application_id))

@router.post('/', response_model=AttachmentRead)
def create_attachment(data: AttachmentCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.dict())

@router.get('/{obj_id}', response_model=AttachmentRead)
def read_attachment(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
    return obj

@router.get('/', response_model=list[AttachmentRead])
def read_attachments(db: Session = Depends(get_db)):
    return list(crud.get_all(db))

@router.put('/{obj_id}', response_model=AttachmentRead)
def update_attachment(obj_id: uuid.UUID, data: AttachmentCreate, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
    return crud.update(db, obj, data.dict())

@router.delete('/{obj_id}')
def delete_attachment(obj_id: uuid.UUID, db: Session = Depends(get_db)):
    obj = crud.get_by_id(db, obj_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Attachment not found")
    crud.delete(db, obj)
    return {'ok': True}
