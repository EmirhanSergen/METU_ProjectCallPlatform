from .base import *

class SecurityOtherBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    question_text: Optional[str] = None
    answer: Optional[str] = None
    details: Optional[str] = None


class SecurityOtherCreate(SecurityOtherBase):
    pass


class SecurityOtherRead(SecurityOtherBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
