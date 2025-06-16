from .base import *

class AcademicReference(Base, SoftDeleteMixin):
    __tablename__ = 'academic_references'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    ref_type = Column(String(50))
    title = Column(Text)
    year = Column(Integer)
    doi = Column(String(255))

    application_form = relationship('ApplicationForm', back_populates='academic_references')


# 8. Suggested References & Mobility
