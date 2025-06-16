from .base import *

class CallRequiredDocument(Base):
    __tablename__ = 'call_required_documents'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    doc_name = Column(String(255), nullable=False)
    mime_types = Column(String(255))
    mandatory = Column(Boolean, default=True)
    order_index = Column(Integer)

    call = relationship('Call', back_populates='required_documents')
