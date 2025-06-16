from .base import *

class ApplicationFormBase(BaseModel):
    application_id: Optional[uuid.UUID] = None
    applicant_name: Optional[str] = None
    project_number: Optional[str] = None
    project_title: Optional[str] = None
    title: Optional[str] = None
    surname: Optional[str] = None
    first_name: Optional[str] = None
    year_of_birth: Optional[int] = None
    nationality: Optional[str] = None
    organisation: Optional[str] = None
    university: Optional[str] = None
    department: Optional[str] = None
    town_or_city: Optional[str] = None
    country: Optional[str] = None
    current_position: Optional[str] = None
    gender: Optional[str] = None
    passport_or_id_path: Optional[str] = None
    phd_certificate_path: Optional[str] = None
    acronym: Optional[str] = None
    keywords: Optional[str] = None
    abstract: Optional[str] = None
    selected_supervisor: Optional[str] = None
    has_secondment: Optional[bool] = False
    selected_from_db: Optional[bool] = None
    institution_name: Optional[str] = None
    loc_document_path: Optional[str] = None
    doctoral_discipline: Optional[str] = None
    doctoral_thesis_title: Optional[str] = None
    doctoral_awarding_institution: Optional[str] = None
    doctoral_award_date: Optional[date] = None
    current_institution: Optional[str] = None
    current_department: Optional[str] = None
    current_institution_town: Optional[str] = None
    current_institution_country: Optional[str] = None
    current_phone_number: Optional[str] = None
    agreed: Optional[bool] = False
    uploaded_proposal_path: Optional[str] = None
    uploaded_cv_path: Optional[str] = None
    ethics_confirmed: Optional[bool] = False
    ethical_dimension_description: Optional[str] = None
    compliance_text: Optional[str] = None
    security_self_assessment_text: Optional[str] = None


class ApplicationFormCreate(ApplicationFormBase):
    pass


class ApplicationFormRead(ApplicationFormBase):
    id: uuid.UUID
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
