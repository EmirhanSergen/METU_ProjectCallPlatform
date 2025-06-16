from .base import *

class AcademicPortfolioBase(BaseModel):
    application_form_id: Optional[uuid.UUID] = None
    field_name: Optional[str] = None
    field_value: Optional[str] = None


class AcademicPortfolioCreate(AcademicPortfolioBase):
    pass


class AcademicPortfolioRead(AcademicPortfolioBase):
    id: uuid.UUID

    class Config:
        orm_mode = True
