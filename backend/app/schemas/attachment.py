from .base import *

class AttachmentBase(BaseModel):
    application_id: Optional[uuid.UUID] = None
    doc_name: Optional[str] = None
    file_path: Optional[str] = None
    confirmed: Optional[bool] = False


class AttachmentCreate(AttachmentBase):
    pass


class AttachmentRead(AttachmentBase):
    id: uuid.UUID
    uploaded_at: Optional[datetime]

    class Config:
        orm_mode = True
