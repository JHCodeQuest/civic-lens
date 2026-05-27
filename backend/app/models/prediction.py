from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from app.models.base import BaseModel


class Prediction(BaseModel):
    __tablename__ = "predictions"

    constituency_id = Column(String(36), ForeignKey("constituencies.id"), nullable=False, index=True)
    predicted_winner_id = Column(String(36), ForeignKey("parties.id"), nullable=True)
    predicted_winner_name = Column(String(100), nullable=False)
    confidence = Column(Float, nullable=False)
    model_used = Column(String(50), nullable=False, default="uniform_swing")
    prediction_date = Column(DateTime(timezone=True), nullable=True)
    notes = Column(String(500), nullable=True)
