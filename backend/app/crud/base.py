from typing import Type, TypeVar, Iterable, Any

from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")


def create(db: Session, model: Type[ModelType], data: dict) -> ModelType:
    # Accept all fields, including binary ones
    obj = model(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_by_id(
    db: Session, model: Type[ModelType], obj_id: Any, include_deleted: bool = False
) -> ModelType | None:
    query = db.query(model).filter(model.id == obj_id)
    if hasattr(model, "is_deleted") and not include_deleted:
        query = query.filter(model.is_deleted.is_(False))
    return query.first()


def get_all(
    db: Session, model: Type[ModelType], include_deleted: bool = False
) -> Iterable[ModelType]:
    query = db.query(model)
    if hasattr(model, "is_deleted") and not include_deleted:
        query = query.filter(model.is_deleted.is_(False))
    return query.all()


def update(db: Session, obj: ModelType, data: dict) -> ModelType:
    for field, value in data.items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, obj: ModelType) -> None:
    if hasattr(obj, "is_deleted"):
        obj.is_deleted = True
        db.commit()
    else:
        db.delete(obj)
        db.commit()


def get_all_by_field(
    db: Session,
    model: Type[ModelType],
    field: str,
    value: Any,
    include_deleted: bool = False,
) -> Iterable[ModelType]:
    query = db.query(model).filter(getattr(model, field) == value)
    if hasattr(model, "is_deleted") and not include_deleted:
        query = query.filter(model.is_deleted.is_(False))
    return query.all()
