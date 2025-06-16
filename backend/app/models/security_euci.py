from .base import *

class SecurityEUCI(Base):
    __tablename__ = 'security_euci'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    question_text = Column(Text)
    answer = Column(String(3))
    page_reference = Column(String(50))

    application_form = relationship('ApplicationForm', back_populates='security_euci')
