from .base import *

class AcademicPortfolio(Base):
    __tablename__ = 'academic_portfolio'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    field_name = Column(String(255))
    field_value = Column(Text)

    application_form = relationship('ApplicationForm', back_populates='academic_portfolio')
