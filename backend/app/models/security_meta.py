from .base import *

class SecurityMeta(Base):
    __tablename__ = 'security_meta'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String(100))
    label = Column(String(255))

    # There are no relationships defined for this meta table
