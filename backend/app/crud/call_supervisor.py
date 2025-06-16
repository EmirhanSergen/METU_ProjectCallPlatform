from sqlalchemy.orm import Session

from ..models import CallSupervisor
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> CallSupervisor:
    return _create(db, CallSupervisor, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, CallSupervisor, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, CallSupervisor, include_deleted)


def update(db: Session, obj: CallSupervisor, data: dict) -> CallSupervisor:
    return _update(db, obj, data)


def delete(db: Session, obj: CallSupervisor) -> None:
    _delete(db, obj)


def get_call_supervisors_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, CallSupervisor, 'call_id', call_id, include_deleted)


def get_call_supervisors_by_supervisor_id(db: Session, supervisor_id: str, include_deleted: bool = False):
    return get_all_by_field(db, CallSupervisor, 'supervisor_id', supervisor_id, include_deleted)
