from .base import *

class Institution(Base):
    __tablename__ = 'institutions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    country = Column(String(100))
    website = Column(Text)

    supervisors = relationship('Supervisor', back_populates='institution')
    call_links = relationship('CallInstitution', back_populates='institution')
