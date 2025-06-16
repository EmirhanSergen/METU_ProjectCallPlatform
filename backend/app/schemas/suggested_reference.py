from .base import *

class SuggestedReferenceBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    name_surname: str
    institution: str
    department: Optional[str] = None
    country: Optional[str] = None
    position: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    reason: Optional[str] = None


class SuggestedReferenceCreate(SuggestedReferenceBase):
    pass


class SuggestedReferenceRead(SuggestedReferenceBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
