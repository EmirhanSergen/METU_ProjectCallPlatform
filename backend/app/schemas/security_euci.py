from .base import *

class SecurityEUCIBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    question_text: Optional[str] = None
    answer: Optional[str] = None
    page_reference: Optional[str] = None


class SecurityEUCCreate(SecurityEUCIBase):
    pass


class SecurityEUCIRead(SecurityEUCIBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
