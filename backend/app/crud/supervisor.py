from sqlalchemy.orm import Session

from ..models import Supervisor
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> Supervisor:
    return _create(db, Supervisor, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, Supervisor, obj_id)


def get_all(db: Session):
    return _get_all(db, Supervisor)


def update(db: Session, obj: Supervisor, data: dict) -> Supervisor:
    return _update(db, obj, data)


def delete(db: Session, obj: Supervisor) -> None:
    _delete(db, obj)


def get_supervisors_by_institution_id(db: Session, institution_id: str):
    return get_all_by_field(db, Supervisor, 'institution_id', institution_id)
