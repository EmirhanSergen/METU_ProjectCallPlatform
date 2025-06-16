from .base import *

class AcademicReferenceBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    ref_type: Optional[str] = None
    title: Optional[str] = None
    year: Optional[int] = None
    doi: Optional[str] = None


class AcademicReferenceCreate(AcademicReferenceBase):
    pass


class AcademicReferenceRead(AcademicReferenceBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
