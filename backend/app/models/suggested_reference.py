from .base import *

class SuggestedReference(Base, SoftDeleteMixin):
    __tablename__ = 'suggested_references'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    name_surname = Column(String(255), nullable=False)
    institution = Column(String(255), nullable=False)
    department = Column(String(255))
    country = Column(String(100))
    position = Column(String(100))
    phone_number = Column(String(50))
    email = Column(String(255))
    reason = Column(Text)

    application_form = relationship('ApplicationForm', back_populates='suggested_references')
