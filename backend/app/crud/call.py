from sqlalchemy.orm import Session

from ..models import Call
from ..core.enums import CallStatus
from .base import (
    create as _create,
    get_by_id as _get_by_id,
    get_all as _get_all,
    update as _update,
    delete as _delete,
    get_all_by_field,
)


def create(db: Session, data: dict) -> Call:
    return _create(db, Call, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, Call, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, Call, include_deleted)


def get_by_status(db: Session, status: CallStatus, include_deleted: bool = False):
    """Return all calls with the given status."""
    return get_all_by_field(db, Call, "status", status, include_deleted)


def update(db: Session, obj: Call, data: dict) -> Call:
    return _update(db, obj, data)


def delete(db: Session, obj: Call) -> None:
    _delete(db, obj)
