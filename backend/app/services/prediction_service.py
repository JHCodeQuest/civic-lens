from sqlalchemy.orm import Session

from app.repositories.prediction_repo import PredictionRepository
from app.repositories.constituency_repo import ConstituencyRepository
from app.schemas.prediction import PredictionResponse, PredictionCreate


class PredictionService:
    def __init__(self, db: Session) -> None:
        self.prediction_repo = PredictionRepository(db)
        self.constituency_repo = ConstituencyRepository(db)

    def list_predictions(self, model: str | None = None) -> list[PredictionResponse]:
        if model:
            predictions = self.prediction_repo.get_by_model(model)
        else:
            predictions = self.prediction_repo.list_all()
        return [self._to_response(p) for p in predictions]

    def get_prediction_for_constituency(self, constituency_id: str) -> PredictionResponse | None:
        pred = self.prediction_repo.get_latest_by_constituency(constituency_id)
        if not pred:
            return None
        return self._to_response(pred)

    def create_prediction(self, data: PredictionCreate) -> PredictionResponse:
        pred = self.prediction_repo.create(**data.model_dump())
        return self._to_response(pred)

    def _to_response(self, pred) -> PredictionResponse:
        const = self.constituency_repo.get_by_id(pred.constituency_id)
        return PredictionResponse(
            id=pred.id,
            constituency_id=pred.constituency_id,
            predicted_winner_name=pred.predicted_winner_name,
            predicted_winner_id=pred.predicted_winner_id,
            confidence=pred.confidence,
            model_used=pred.model_used,
            prediction_date=pred.prediction_date,
            notes=pred.notes,
            constituency_name=const.name if const else None,
            created_at=pred.created_at,
            updated_at=pred.updated_at,
        )
