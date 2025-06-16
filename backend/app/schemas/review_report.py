from .base import *

class ReviewReportBase(BaseModel):
    call_id: Optional[uuid.UUID] = None
    application_id: Optional[uuid.UUID] = None
    reviewer_id: Optional[uuid.UUID] = None
    project_number: Optional[str] = None
    applicant_name: Optional[str] = None
    project_type: Optional[str] = None
    project_title: Optional[str] = None
    excellence_grade: Optional[int] = None
    impact_grade: Optional[int] = None
    implementation_grade: Optional[int] = None
    excellence_comments: Optional[dict] = None
    impact_comments: Optional[dict] = None
    implementation_comments: Optional[dict] = None
    raises_ethics_issues: Optional[bool] = None
    ethics_details: Optional[str] = None
    total_score: Optional[float] = None
    total_weighted_score: Optional[float] = None
    normalized_score: Optional[float] = None
    additional_comments: Optional[str] = None


class ReviewReportCreate(ReviewReportBase):
    pass


class ReviewReportRead(ReviewReportBase):
    id: uuid.UUID
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
