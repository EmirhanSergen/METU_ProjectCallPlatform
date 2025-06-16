from .base import *


class ApplicationInfo(Base, SoftDeleteMixin):
    """Optional application metadata separate from the main form."""
    __tablename__ = 'application_info'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey('applications.id', ondelete='CASCADE'), unique=True)
    applicant_name = Column(String(255))
    project_number = Column(String(50))
    project_title = Column(String(500))

    application = relationship('Application', back_populates='info')


# 6. Application Forms
