from .base import *

class InstitutionBase(BaseModel):
    name: str
    country: Optional[str] = None
    website: Optional[str] = None


class InstitutionCreate(InstitutionBase):
    pass


class InstitutionRead(InstitutionBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
