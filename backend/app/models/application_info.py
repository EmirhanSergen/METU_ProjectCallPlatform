from .base import *

class ApplicationInfo(Base, SoftDeleteMixin):
    __tablename__ = 'application_info'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey('applications.id', ondelete='CASCADE'), nullable=False)
    applicant_name = Column(String(255))
    project_number = Column(String(50))
    project_title = Column(String(500))

    __table_args__ = (
        UniqueConstraint('application_id', 'is_deleted', name='uq_app_info_app_id_deleted'),
    )

    application = relationship('Application', back_populates='info')


# 6. Application Forms
