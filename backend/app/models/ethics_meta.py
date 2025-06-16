from .base import *

class EthicsMeta(Base):
    __tablename__ = 'ethics_meta'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String(100))
    label = Column(String(255))

    issues = relationship('EthicsIssue', back_populates='meta')
