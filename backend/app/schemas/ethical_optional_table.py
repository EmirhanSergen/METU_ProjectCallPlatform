from .base import *

class EthicalOptionalTableBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    rows: Optional[int] = None
    columns: Optional[int] = None
    content: Optional[dict] = None


class EthicalOptionalTableCreate(EthicalOptionalTableBase):
    pass


class EthicalOptionalTableRead(EthicalOptionalTableBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
