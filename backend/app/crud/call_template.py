from sqlalchemy.orm import Session

from ..models import CallTemplate
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> CallTemplate:
    return _create(db, CallTemplate, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, CallTemplate, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, CallTemplate, include_deleted)


def update(db: Session, obj: CallTemplate, data: dict) -> CallTemplate:
    return _update(db, obj, data)


def delete(db: Session, obj: CallTemplate) -> None:
    _delete(db, obj)


def get_call_templates_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, CallTemplate, 'call_id', call_id, include_deleted)
