from .base import *

class CallEthicsQuestionBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    category: Optional[str] = None
    question: str


class CallEthicsQuestionCreate(CallEthicsQuestionBase):
    pass


class CallEthicsQuestionRead(CallEthicsQuestionBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
