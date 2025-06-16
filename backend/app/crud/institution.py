from sqlalchemy.orm import Session

from ..models import Institution
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> Institution:
    return _create(db, Institution, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, Institution, obj_id)


def get_all(db: Session):
    return _get_all(db, Institution)


def update(db: Session, obj: Institution, data: dict) -> Institution:
    return _update(db, obj, data)


def delete(db: Session, obj: Institution) -> None:
    _delete(db, obj)
