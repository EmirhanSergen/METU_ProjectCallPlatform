from .base import *

class SecurityAnswerBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    free_text: Optional[str] = None


class SecurityAnswerCreate(SecurityAnswerBase):
    pass


class SecurityAnswerRead(SecurityAnswerBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
