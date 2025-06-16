from .base import *

class CallInstitution(Base):
    __tablename__ = 'call_institutions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    institution_id = Column(UUID(as_uuid=True), ForeignKey('institutions.id'))
    is_default = Column(Boolean, default=False)

    call = relationship('Call', back_populates='institutions')
    institution = relationship('Institution', back_populates='call_links')
