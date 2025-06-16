from .base import *

class EthicsIssueBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    meta_id: Optional[uuid.UUID] = None
    question_text: str
    answer: Optional[str] = None
    page_reference: Optional[str] = None


class EthicsIssueCreate(EthicsIssueBase):
    pass


class EthicsIssueRead(EthicsIssueBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
