from .base import *

class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.applicant


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: uuid.UUID
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
