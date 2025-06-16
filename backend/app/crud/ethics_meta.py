from sqlalchemy.orm import Session

from ..models import EthicsMeta
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> EthicsMeta:
    return _create(db, EthicsMeta, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, EthicsMeta, obj_id)


def get_all(db: Session):
    return _get_all(db, EthicsMeta)


def update(db: Session, obj: EthicsMeta, data: dict) -> EthicsMeta:
    return _update(db, obj, data)


def delete(db: Session, obj: EthicsMeta) -> None:
    _delete(db, obj)
