from .base import *

class EthicalOptionalTable(Base):
    __tablename__ = 'ethical_optional_tables'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    rows = Column(Integer)
    columns = Column(Integer)
    content = Column(JSON)

    application_form = relationship('ApplicationForm', back_populates='ethical_optional_tables')


# 10. Security tables
