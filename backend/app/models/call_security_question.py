from .base import *

class CallSecurityQuestion(Base):
    __tablename__ = 'call_security_questions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id = Column(UUID(as_uuid=True), ForeignKey('calls.id', ondelete='CASCADE'))
    category = Column(String(100))
    question = Column(Text, nullable=False)

    call = relationship('Call', back_populates='security_questions')


# 4. Applications and attachments
