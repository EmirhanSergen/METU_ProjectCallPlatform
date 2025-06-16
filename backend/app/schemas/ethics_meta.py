from .base import *

class EthicsMetaBase(BaseModel):
    category: Optional[str] = None
    label: Optional[str] = None


class EthicsMetaCreate(EthicsMetaBase):
    pass


class EthicsMetaRead(EthicsMetaBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
