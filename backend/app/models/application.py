from .base import *


class Application(Base, SoftDeleteMixin):
    """Submission of a call by a user, linking forms and attachments."""
    __tablename__ = 'applications'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    status = Column(SAEnum(ApplicationStatus), default=ApplicationStatus.DRAFT)
    completed_steps = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    call = relationship('Call', back_populates='applications')
    user = relationship('User', back_populates='applications')
    attachments = relationship('Attachment', back_populates='application')
    info = relationship('ApplicationInfo', back_populates='application', uselist=False)
    form = relationship('ApplicationForm', back_populates='application', uselist=False)
    review_reports = relationship('ReviewReport', back_populates='application')
