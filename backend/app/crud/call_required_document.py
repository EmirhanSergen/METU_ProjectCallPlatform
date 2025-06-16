from sqlalchemy.orm import Session

from ..models import CallRequiredDocument
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> CallRequiredDocument:
    return _create(db, CallRequiredDocument, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, CallRequiredDocument, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, CallRequiredDocument, include_deleted)


def update(db: Session, obj: CallRequiredDocument, data: dict) -> CallRequiredDocument:
    return _update(db, obj, data)


def delete(db: Session, obj: CallRequiredDocument) -> None:
    _delete(db, obj)


def get_call_required_documents_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, CallRequiredDocument, 'call_id', call_id, include_deleted)
