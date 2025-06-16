from __future__ import annotations

import uuid
from typing import List, Optional

from sqlalchemy.orm import Session

from ..models.user import User
from ..schemas.user import UserCreate


def get_users(db: Session) -> List[User]:
    return db.query(User).all()


def get_user(db: Session, user_id: uuid.UUID) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user_in: UserCreate) -> User:
    db_user = User(
        email=user_in.email,
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        role=user_in.role,
        password_hash=user_in.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, db_user: User, user_in: UserCreate) -> User:
    db_user.email = user_in.email
    db_user.first_name = user_in.first_name
    db_user.last_name = user_in.last_name
    db_user.role = user_in.role
    db_user.password_hash = user_in.password
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, db_user: User) -> None:
    db.delete(db_user)
    db.commit()
