from .base import *

class User(Base, SoftDeleteMixin):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(SAEnum(UserRole), nullable=False, default=UserRole.applicant)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint('email', 'is_deleted', name='uq_users_email_deleted'),
    )

    applications = relationship('Application', back_populates='user')
