from pydantic import BaseModel
from datetime import datetime

class Prediction(BaseModel):
    id: str
    constituency_id: str
    predicted_winner: str
    confidence: float
    date: datetime
