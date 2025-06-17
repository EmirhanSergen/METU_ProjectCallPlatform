from .base import *

class MobilityEntry(Base, SoftDeleteMixin):
    __tablename__ = 'mobility_entries'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    organisation = Column(String(255))
    country = Column(String(100))

    application_form = relationship('ApplicationForm', back_populates='mobility_entries')


