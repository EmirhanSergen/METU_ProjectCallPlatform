from __future__ import annotations

import uuid
from datetime import datetime, date

from sqlalchemy import (
    Column,
    String,
    Text,
    Boolean,
    Integer,
    Date,
    DateTime,
    ForeignKey,
    Enum as SAEnum,
    JSON,
    Numeric,
    SmallInteger,
    LargeBinary,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database import Base
from ..core.enums import UserRole, CallStatus, ApplicationStatus


class SoftDeleteMixin:
    """Mixin providing soft delete support."""

    is_deleted = Column(Boolean, default=False)

__all__ = [
    'uuid', 'datetime', 'date', 'Column', 'String', 'Text', 'Boolean', 'Integer',
    'Date', 'DateTime', 'ForeignKey', 'SAEnum', 'JSON', 'Numeric', 'SmallInteger',
    'LargeBinary', 'UUID', 'relationship', 'Base',
    'UserRole', 'CallStatus', 'ApplicationStatus', 'SoftDeleteMixin'
]
