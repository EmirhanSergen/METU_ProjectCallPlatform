from sqlalchemy.orm import Session

from ..models import User
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> User:
    return _create(db, User, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, User, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, User, include_deleted)


def update(db: Session, obj: User, data: dict) -> User:
    return _update(db, obj, data)


def delete(db: Session, obj: User) -> None:
    _delete(db, obj)
