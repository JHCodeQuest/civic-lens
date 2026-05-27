from datetime import datetime
from pydantic import Field
from app.schemas.base import CamelCaseSchema, BaseResponse


class PredictionBase(CamelCaseSchema):
    constituency_id: str = Field(..., min_length=1)
    predicted_winner_name: str = Field(..., max_length=100)
    predicted_winner_id: str | None = None
    confidence: float = Field(..., ge=0.0, le=100.0)
    model_used: str = Field(default="uniform_swing", max_length=50)
    notes: str | None = None


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(BaseResponse, PredictionBase):
    prediction_date: datetime | None = None
    constituency_name: str | None = None
