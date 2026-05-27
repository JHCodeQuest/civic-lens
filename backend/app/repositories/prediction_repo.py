from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.prediction import Prediction
from app.repositories.base import BaseRepository


class PredictionRepository(BaseRepository[Prediction]):
    def __init__(self, db: Session) -> None:
        super().__init__(db, Prediction)

    def get_by_constituency(self, constituency_id: str) -> list[Prediction]:
        stmt = (
            select(Prediction)
            .where(Prediction.constituency_id == constituency_id)
            .order_by(Prediction.created_at.desc())
        )
        return list(self.db.execute(stmt).scalars().all())

    def get_latest_by_constituency(self, constituency_id: str) -> Prediction | None:
        stmt = (
            select(Prediction)
            .where(Prediction.constituency_id == constituency_id)
            .order_by(Prediction.created_at.desc())
            .limit(1)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_model(self, model_used: str) -> list[Prediction]:
        stmt = select(Prediction).where(Prediction.model_used == model_used)
        return list(self.db.execute(stmt).scalars().all())
