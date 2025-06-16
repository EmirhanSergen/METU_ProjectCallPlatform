from sqlalchemy.orm import Session

from ..models import SecurityEUCI
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> SecurityEUCI:
    return _create(db, SecurityEUCI, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, SecurityEUCI, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, SecurityEUCI, include_deleted)


def update(db: Session, obj: SecurityEUCI, data: dict) -> SecurityEUCI:
    return _update(db, obj, data)


def delete(db: Session, obj: SecurityEUCI) -> None:
    _delete(db, obj)


def get_security_eucis_by_application_form_id(db: Session, application_form_id: str, include_deleted: bool = False):
    return get_all_by_field(db, SecurityEUCI, 'application_form_id', application_form_id, include_deleted)
