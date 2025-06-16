from .base import *

class EthicsAnswerBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    free_text: Optional[str] = None


class EthicsAnswerCreate(EthicsAnswerBase):
    pass


class EthicsAnswerRead(EthicsAnswerBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
