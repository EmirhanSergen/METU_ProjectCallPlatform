from sqlalchemy.orm import Session

from ..models import SecurityMeta
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> SecurityMeta:
    return _create(db, SecurityMeta, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, SecurityMeta, obj_id)


def get_all(db: Session):
    return _get_all(db, SecurityMeta)


def update(db: Session, obj: SecurityMeta, data: dict) -> SecurityMeta:
    return _update(db, obj, data)


def delete(db: Session, obj: SecurityMeta) -> None:
    _delete(db, obj)
