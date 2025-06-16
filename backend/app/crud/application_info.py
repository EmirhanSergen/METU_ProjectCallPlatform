from sqlalchemy.orm import Session

from ..models import ApplicationInfo
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> ApplicationInfo:
    return _create(db, ApplicationInfo, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, ApplicationInfo, obj_id)


def get_all(db: Session):
    return _get_all(db, ApplicationInfo)


def update(db: Session, obj: ApplicationInfo, data: dict) -> ApplicationInfo:
    return _update(db, obj, data)


def delete(db: Session, obj: ApplicationInfo) -> None:
    _delete(db, obj)


def get_application_infos_by_application_id(db: Session, application_id: str):
    return get_all_by_field(db, ApplicationInfo, 'application_id', application_id)
