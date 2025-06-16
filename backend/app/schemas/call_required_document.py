from .base import *

class CallRequiredDocumentBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    doc_name: str
    mime_types: Optional[str] = None
    mandatory: Optional[bool] = True
    order_index: Optional[int] = None


class CallRequiredDocumentCreate(CallRequiredDocumentBase):
    pass


class CallRequiredDocumentRead(CallRequiredDocumentBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
