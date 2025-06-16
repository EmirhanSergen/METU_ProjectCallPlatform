import enum

class UserRole(str, enum.Enum):
    applicant = 'applicant'
    reviewer = 'reviewer'
    admin = 'admin'
    super_admin = 'super_admin'


class CallStatus(str, enum.Enum):
    DRAFT = 'DRAFT'
    PUBLISHED = 'PUBLISHED'
    CLOSED = 'CLOSED'
    ARCHIVED = 'ARCHIVED'


class ApplicationStatus(str, enum.Enum):
    DRAFT = 'DRAFT'
    SUBMITTED = 'SUBMITTED'
    CLOSED = 'CLOSED'
    ARCHIVED = 'ARCHIVED'
