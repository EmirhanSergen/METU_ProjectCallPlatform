from sqlalchemy.orm import Session

from ..models import CallEthicsQuestion
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> CallEthicsQuestion:
    return _create(db, CallEthicsQuestion, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, CallEthicsQuestion, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, CallEthicsQuestion, include_deleted)


def update(db: Session, obj: CallEthicsQuestion, data: dict) -> CallEthicsQuestion:
    return _update(db, obj, data)


def delete(db: Session, obj: CallEthicsQuestion) -> None:
    _delete(db, obj)


def get_call_ethics_questions_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, CallEthicsQuestion, 'call_id', call_id, include_deleted)
