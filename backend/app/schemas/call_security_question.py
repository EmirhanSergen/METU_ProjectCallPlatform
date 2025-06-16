from .base import *

class CallSecurityQuestionBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    category: Optional[str] = None
    question: str


class CallSecurityQuestionCreate(CallSecurityQuestionBase):
    pass


class CallSecurityQuestionRead(CallSecurityQuestionBase):
    id: uuid.UUID

    class Config:
        orm_mode = True


# Application schemas
