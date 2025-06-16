from sqlalchemy.orm import Session

from ..models import EthicsAnswer
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> EthicsAnswer:
    return _create(db, EthicsAnswer, data)


def get_by_id(db: Session, obj_id):
    return _get_by_id(db, EthicsAnswer, obj_id)


def get_all(db: Session):
    return _get_all(db, EthicsAnswer)


def update(db: Session, obj: EthicsAnswer, data: dict) -> EthicsAnswer:
    return _update(db, obj, data)


def delete(db: Session, obj: EthicsAnswer) -> None:
    _delete(db, obj)


def get_ethics_answers_by_application_form_id(db: Session, application_form_id: str):
    return get_all_by_field(db, EthicsAnswer, 'application_form_id', application_form_id)
