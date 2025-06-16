from .base import *

class ApplicationForm(Base, SoftDeleteMixin):
    __tablename__ = 'application_forms'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey('applications.id', ondelete='CASCADE'), nullable=False)

    applicant_name = Column(String(255))
    project_number = Column(String(50))
    project_title = Column(String(500))
    title = Column(String(20))
    surname = Column(String(255))
    first_name = Column(String(255))
    year_of_birth = Column(Integer)
    nationality = Column(String(100))
    organisation = Column(String(255))
    university = Column(String(255))
    department = Column(String(255))
    town_or_city = Column(String(255))
    country = Column(String(100))
    current_position = Column(String(100))
    gender = Column(String(20))

    passport_or_id_path = Column(Text)
    passport_or_id_blob = Column(LargeBinary)
    phd_certificate_path = Column(Text)
    phd_certificate_blob = Column(LargeBinary)

    acronym = Column(String(100))
    keywords = Column(Text)
    abstract = Column(Text)
    selected_supervisor = Column(String(255))
    has_secondment = Column(Boolean, default=False)
    selected_from_db = Column(Boolean)
    institution_name = Column(String(255))
    loc_document_path = Column(Text)
    loc_document_blob = Column(LargeBinary)

    doctoral_discipline = Column(String(255))
    doctoral_thesis_title = Column(String(500))
    doctoral_awarding_institution = Column(String(255))
    doctoral_award_date = Column(Date)
    current_institution = Column(String(255))
    current_department = Column(String(255))
    current_institution_town = Column(String(255))
    current_institution_country = Column(String(100))
    current_phone_number = Column(String(50))

    agreed = Column(Boolean, default=False)

    uploaded_proposal_path = Column(Text)
    uploaded_proposal_blob = Column(LargeBinary)
    uploaded_cv_path = Column(Text)
    uploaded_cv_blob = Column(LargeBinary)

    ethics_confirmed = Column(Boolean, default=False)
    ethical_dimension_description = Column(Text)
    compliance_text = Column(Text)
    security_self_assessment_text = Column(Text)

    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint('application_id', 'is_deleted', name='uq_app_form_app_id_deleted'),
        UniqueConstraint('project_number', 'is_deleted', name='uq_app_form_project_number_deleted'),
    )

    application = relationship('Application', back_populates='form')
    academic_portfolio = relationship('AcademicPortfolio', back_populates='application_form')
    academic_references = relationship('AcademicReference', back_populates='application_form')
    suggested_references = relationship('SuggestedReference', back_populates='application_form')
    mobility_entries = relationship('MobilityEntry', back_populates='application_form')
    ethics_issues = relationship('EthicsIssue', back_populates='application_form')
    ethics_answers = relationship('EthicsAnswer', back_populates='application_form')
    ethical_optional_tables = relationship('EthicalOptionalTable', back_populates='application_form')
    security_euci = relationship('SecurityEUCI', back_populates='application_form')
    security_misuse = relationship('SecurityMisuse', back_populates='application_form')
    security_other = relationship('SecurityOther', back_populates='application_form')
    security_answers = relationship('SecurityAnswer', back_populates='application_form')


# 7. Academic portfolio details
