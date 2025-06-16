from .base import *

class SecurityMetaBase(BaseModel):
    category: Optional[str] = None
    label: Optional[str] = None


class SecurityMetaCreate(SecurityMetaBase):
    pass


class SecurityMetaRead(SecurityMetaBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
