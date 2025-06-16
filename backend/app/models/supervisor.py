from .base import *

class Supervisor(Base):
    __tablename__ = 'supervisors'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    institution_id = Column(UUID(as_uuid=True), ForeignKey('institutions.id'))
    name_surname = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(50))
    department = Column(String(255))

    institution = relationship('Institution', back_populates='supervisors')
    call_links = relationship('CallSupervisor', back_populates='supervisor')


# 2. Calls and Templates
