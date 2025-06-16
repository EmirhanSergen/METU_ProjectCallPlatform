from .base import *

class CallInstitutionBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    institution_id: Optional[uuid.UUID] = None
    is_default: Optional[bool] = False


class CallInstitutionCreate(CallInstitutionBase):
    pass


class CallInstitutionRead(CallInstitutionBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
