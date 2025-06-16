from .base import *

class ApplicationInfoBase(BaseModel):
    application_id: Optional[uuid.UUID] = None
    applicant_name: Optional[str] = None
    project_number: Optional[str] = None
    project_title: Optional[str] = None


class ApplicationInfoCreate(ApplicationInfoBase):
    pass


class ApplicationInfoRead(ApplicationInfoBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
