from .base import *

class SecurityMisuseBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    question_text: Optional[str] = None
    answer: Optional[str] = None
    page_reference: Optional[str] = None


class SecurityMisuseCreate(SecurityMisuseBase):
    pass


class SecurityMisuseRead(SecurityMisuseBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
