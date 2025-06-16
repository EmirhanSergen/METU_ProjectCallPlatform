from .base import *

class SecurityMisuse(Base):
    __tablename__ = 'security_misuse'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    question_text = Column(Text)
    answer = Column(String(3))
    page_reference = Column(String(50))

    application_form = relationship('ApplicationForm', back_populates='security_misuse')
