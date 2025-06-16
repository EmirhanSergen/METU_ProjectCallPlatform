from .base import *

class SupervisorBase(BaseModel):
    institution_id: Optional[uuid.UUID] = None
    name_surname: str
    email: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None


class SupervisorCreate(SupervisorBase):
    pass


class SupervisorRead(SupervisorBase):
    id: uuid.UUID

    class Config:
        orm_mode = True


# Call schemas
