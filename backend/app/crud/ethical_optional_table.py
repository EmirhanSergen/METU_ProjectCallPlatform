from sqlalchemy.orm import Session

from ..models import EthicalOptionalTable
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> EthicalOptionalTable:
    return _create(db, EthicalOptionalTable, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, EthicalOptionalTable, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, EthicalOptionalTable, include_deleted)


def update(db: Session, obj: EthicalOptionalTable, data: dict) -> EthicalOptionalTable:
    return _update(db, obj, data)


def delete(db: Session, obj: EthicalOptionalTable) -> None:
    _delete(db, obj)


def get_ethical_optional_tables_by_application_form_id(db: Session, application_form_id: str, include_deleted: bool = False):
    return get_all_by_field(db, EthicalOptionalTable, 'application_form_id', application_form_id, include_deleted)
