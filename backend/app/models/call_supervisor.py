from .base import *

class CallSupervisor(Base):
    __tablename__ = 'call_supervisors'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    supervisor_id = Column(UUID(as_uuid=True), ForeignKey('supervisors.id'))

    call = relationship('Call', back_populates='supervisors')
    supervisor = relationship('Supervisor', back_populates='call_links')


# 3. Ethics/Security question pools
