from .base import *

class EthicsIssue(Base):
    __tablename__ = 'ethics_issues'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_form_id = Column(UUID(as_uuid=True), ForeignKey('application_forms.id', ondelete='CASCADE'))
    meta_id = Column(UUID(as_uuid=True), ForeignKey('ethics_meta.id'))
    question_text = Column(Text, nullable=False)
    answer = Column(String(3))
    page_reference = Column(String(50))

    application_form = relationship('ApplicationForm', back_populates='ethics_issues')
    meta = relationship('EthicsMeta', back_populates='issues')
