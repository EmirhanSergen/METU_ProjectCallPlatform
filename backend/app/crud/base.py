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


def get_by_id(db: Session, model: Type[ModelType], obj_id: Any) -> ModelType | None:
    return db.query(model).filter(model.id == obj_id).first()


def get_all(db: Session, model: Type[ModelType]) -> Iterable[ModelType]:
    return db.query(model).all()


def update(db: Session, obj: ModelType, data: dict) -> ModelType:
    for field, value in data.items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, obj: ModelType) -> None:
    db.delete(obj)
    db.commit()


def get_all_by_field(db: Session, model: Type[ModelType], field: str, value: Any) -> Iterable[ModelType]:
    return db.query(model).filter(getattr(model, field) == value).all()
