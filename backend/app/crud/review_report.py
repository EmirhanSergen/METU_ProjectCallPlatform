from sqlalchemy.orm import Session

from ..models import ReviewReport
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: dict) -> ReviewReport:
    return _create(db, ReviewReport, data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, ReviewReport, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, ReviewReport, include_deleted)


def update(db: Session, obj: ReviewReport, data: dict) -> ReviewReport:
    return _update(db, obj, data)


def delete(db: Session, obj: ReviewReport) -> None:
    _delete(db, obj)


def get_review_reports_by_call_id(db: Session, call_id: str, include_deleted: bool = False):
    return get_all_by_field(db, ReviewReport, 'call_id', call_id, include_deleted)


def get_review_reports_by_application_id(db: Session, application_id: str, include_deleted: bool = False):
    return get_all_by_field(db, ReviewReport, 'application_id', application_id, include_deleted)


def get_review_reports_by_reviewer_id(db: Session, reviewer_id: str, include_deleted: bool = False):
    return get_all_by_field(db, ReviewReport, 'reviewer_id', reviewer_id, include_deleted)
