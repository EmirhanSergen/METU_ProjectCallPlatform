from .base import *

class SecurityAnswer(Base, SoftDeleteMixin):
    __tablename__ = 'security_answers'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    free_text = Column(Text)

    application_form = relationship('ApplicationForm', back_populates='security_answers')


