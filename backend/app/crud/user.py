from sqlalchemy.orm import Session

from passlib.hash import bcrypt

from ..models import User
from ..schemas import UserCreate
from .base import create as _create, get_by_id as _get_by_id, get_all as _get_all, update as _update, delete as _delete, get_all_by_field


def create(db: Session, data: UserCreate | dict) -> User:
    """Create a new user with hashed password."""

    if isinstance(data, dict):
        password = data.pop("password")
        user_data = data
    else:
        password = data.password
        user_data = data.dict(exclude={"password"})

    user_data["password_hash"] = bcrypt.hash(password)

    return _create(db, User, user_data)


def get_by_id(db: Session, obj_id, include_deleted: bool = False):
    return _get_by_id(db, User, obj_id, include_deleted)


def get_all(db: Session, include_deleted: bool = False):
    return _get_all(db, User, include_deleted)


def update(db: Session, obj: User, data: dict) -> User:
    return _update(db, obj, data)


def delete(db: Session, obj: User) -> None:
    _delete(db, obj)


def get_by_email(db: Session, email: str, include_deleted: bool = False) -> User | None:
    query = db.query(User).filter(User.email == email)
    if not include_deleted:
        query = query.filter(User.is_deleted.is_(False))
    return query.first()
