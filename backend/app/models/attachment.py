from .base import *

class Attachment(Base, SoftDeleteMixin):
    __tablename__ = 'attachments'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey('applications.id', ondelete='CASCADE'))
    doc_name = Column(String(255))
    field_name = Column(String(255))
    file_path = Column(Text)
    file_blob = Column(LargeBinary)
    confirmed = Column(Boolean, default=False)
    uploaded_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    application = relationship('Application', back_populates='attachments')


