from .base import *

class CallTemplateBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    name: Optional[str] = None
    file_path: Optional[str] = None


class CallTemplateCreate(CallTemplateBase):
    pass


class CallTemplateRead(CallTemplateBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
