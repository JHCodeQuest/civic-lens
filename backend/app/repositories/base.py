from typing import Generic, TypeVar, Type
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.base import BaseModel

T = TypeVar("T", bound=BaseModel)


class BaseRepository(Generic[T]):
    def __init__(self, db: Session, model: Type[T]) -> None:
        self.db = db
        self.model = model

    def get_by_id(self, id: str) -> T | None:
        return self.db.get(self.model, id)

    def list_all(self) -> list[T]:
        stmt = select(self.model).order_by(self.model.created_at)
        return list(self.db.execute(stmt).scalars().all())

    def create(self, **kwargs) -> T:
        instance = self.model(**kwargs)
        self.db.add(instance)
        self.db.flush()
        return instance

    def update(self, instance: T, **kwargs) -> T:
        for key, value in kwargs.items():
            if value is not None:
                setattr(instance, key, value)
        self.db.flush()
        return instance

    def delete(self, instance: T) -> None:
        self.db.delete(instance)
        self.db.flush()
