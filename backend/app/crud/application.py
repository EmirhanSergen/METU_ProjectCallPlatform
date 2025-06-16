from sqlalchemy.orm import Session

from ..models import Application
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> Application:
    return _create(db, Application, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, Application, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, Application, include_deleted)


def update(db: Session, obj: Application, data: dict) -> Application:
    return _update(db, obj, data)


def delete(db: Session, obj: Application) -> None:
    _delete(db, obj)


def get_applications_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, Application, 'call_id', call_id, include_deleted)


def get_applications_by_user_id(db: Session, user_id: str, include_deleted: bool = False):
    return get_all_by_field(db, Application, 'user_id', user_id, include_deleted)
