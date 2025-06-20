from .base import *

class ApplicationBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    user_id: Optional[uuid.UUID] = None
    status: ApplicationStatus = ApplicationStatus.DRAFT
    completed_steps: Optional[list[str]] = []


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationRead(ApplicationBase):
    id: uuid.UUID
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
