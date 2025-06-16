from .base import *

class CallSupervisorBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    supervisor_id: Optional[uuid.UUID] = None


class CallSupervisorCreate(CallSupervisorBase):
    pass


class CallSupervisorRead(CallSupervisorBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
