from __future__ import annotations

import uuid
from typing import List, Optional

from sqlalchemy.orm import Session

from ..models.call import Call
from ..schemas.call import CallCreate


def get_calls(db: Session) -> List[Call]:
    return db.query(Call).all()


def get_call(db: Session, call_id: uuid.UUID) -> Optional[Call]:
    return db.query(Call).filter(Call.id == call_id).first()


def create_call(db: Session, call_in: CallCreate) -> Call:
    db_call = Call(
        title=call_in.title,
        description=call_in.description,
        status=call_in.status,
        start_date=call_in.start_date,
        end_date=call_in.end_date,
    )
    db.add(db_call)
    db.commit()
    db.refresh(db_call)
    return db_call


def update_call(db: Session, db_call: Call, call_in: CallCreate) -> Call:
    db_call.title = call_in.title
    db_call.description = call_in.description
    db_call.status = call_in.status
    db_call.start_date = call_in.start_date
    db_call.end_date = call_in.end_date
    db.commit()
    db.refresh(db_call)
    return db_call


def delete_call(db: Session, db_call: Call) -> None:
    db.delete(db_call)
    db.commit()
