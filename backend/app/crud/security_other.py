from sqlalchemy.orm import Session

from ..models import SecurityOther
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> SecurityOther:
    return _create(db, SecurityOther, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, SecurityOther, obj_id)


def get_all(db: Session):
    return _get_all(db, SecurityOther)


def update(db: Session, obj: SecurityOther, data: dict) -> SecurityOther:
    return _update(db, obj, data)


def delete(db: Session, obj: SecurityOther) -> None:
    _delete(db, obj)


def get_security_others_by_application_form_id(db: Session, application_form_id: str):
    return get_all_by_field(db, SecurityOther, 'application_form_id', application_form_id)
