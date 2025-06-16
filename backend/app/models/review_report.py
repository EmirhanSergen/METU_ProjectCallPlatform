from .base import *

class ReviewReport(Base, SoftDeleteMixin):
    __tablename__ = 'review_reports'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    application_id = Column(UUID(as_uuid=True), ForeignKey('applications.id', ondelete='CASCADE'))
    reviewer_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    project_number = Column(String(50))
    applicant_name = Column(String(255))
    project_type = Column(String(100))
    project_title = Column(String(500))
    excellence_grade = Column(SmallInteger)
    impact_grade = Column(SmallInteger)
    implementation_grade = Column(SmallInteger)
    excellence_comments = Column(JSON)
    impact_comments = Column(JSON)
    implementation_comments = Column(JSON)
    raises_ethics_issues = Column(Boolean)
    ethics_details = Column(Text)
    total_score = Column(Numeric(4, 2))
    total_weighted_score = Column(Numeric(5, 2))
    normalized_score = Column(Numeric(5, 2))
    additional_comments = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    call = relationship('Call', back_populates='review_reports')
    application = relationship('Application', back_populates='review_reports')
    reviewer = relationship('User')
