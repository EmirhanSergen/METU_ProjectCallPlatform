from sqlalchemy.orm import Session

from ..models import CallInstitution
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> CallInstitution:
    return _create(db, CallInstitution, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, CallInstitution, obj_id)


def get_all(db: Session):
    return _get_all(db, CallInstitution)


def update(db: Session, obj: CallInstitution, data: dict) -> CallInstitution:
    return _update(db, obj, data)


def delete(db: Session, obj: CallInstitution) -> None:
    _delete(db, obj)


def get_call_institutions_by_call_id(db: Session, call_id: str):
    return get_all_by_field(db, CallInstitution, 'call_id', call_id)


def get_call_institutions_by_institution_id(db: Session, institution_id: str):
    return get_all_by_field(db, CallInstitution, 'institution_id', institution_id)
