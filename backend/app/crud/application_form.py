from sqlalchemy.orm import Session

from ..models import ApplicationForm
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> ApplicationForm:
    return _create(db, ApplicationForm, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, ApplicationForm, obj_id)


def get_all(db: Session):
    return _get_all(db, ApplicationForm)


def update(db: Session, obj: ApplicationForm, data: dict) -> ApplicationForm:
    return _update(db, obj, data)


def delete(db: Session, obj: ApplicationForm) -> None:
    _delete(db, obj)


def get_application_forms_by_application_id(db: Session, application_id: str):
    return get_all_by_field(db, ApplicationForm, 'application_id', application_id)
