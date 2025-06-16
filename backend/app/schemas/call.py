from .base import *

class CallBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: CallStatus = CallStatus.DRAFT
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class CallCreate(CallBase):
    pass


class CallRead(CallBase):
    id: uuid.UUID
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
