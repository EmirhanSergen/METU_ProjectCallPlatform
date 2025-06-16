from .base import *

class Call(Base, SoftDeleteMixin):
    __tablename__ = 'calls'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(SAEnum(CallStatus), nullable=False, default=CallStatus.DRAFT)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    templates = relationship('CallTemplate', back_populates='call')
    required_documents = relationship('CallRequiredDocument', back_populates='call')
    institutions = relationship('CallInstitution', back_populates='call')
    supervisors = relationship('CallSupervisor', back_populates='call')
    ethics_questions = relationship('CallEthicsQuestion', back_populates='call')
    security_questions = relationship('CallSecurityQuestion', back_populates='call')
    applications = relationship('Application', back_populates='call')
    review_reports = relationship('ReviewReport', back_populates='call')
