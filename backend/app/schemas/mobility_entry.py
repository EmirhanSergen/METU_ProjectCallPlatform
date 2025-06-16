from .base import *

class MobilityEntryBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    from_date: date
    to_date: date
    organisation: Optional[str] = None
    country: Optional[str] = None


class MobilityEntryCreate(MobilityEntryBase):
    pass


class MobilityEntryRead(MobilityEntryBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
