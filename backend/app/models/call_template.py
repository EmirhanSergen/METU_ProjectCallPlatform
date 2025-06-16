from .base import *

class CallTemplate(Base, SoftDeleteMixin):
    __tablename__ = 'call_templates'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    name = Column(String(255))
    file_path = Column(Text)
    file_blob = Column(LargeBinary)

    call = relationship('Call', back_populates='templates')
