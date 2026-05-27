from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.prediction_service import PredictionService
from app.schemas.prediction import PredictionResponse, PredictionCreate

router = APIRouter()


@router.get("/", response_model=list[PredictionResponse])
def list_predictions(
    model: str | None = Query(None, description="Filter by model type"),
    db: Session = Depends(get_db),
):
    service = PredictionService(db)
    return service.list_predictions(model=model)


@router.get("/{constituency_id}", response_model=PredictionResponse)
def get_prediction(constituency_id: str, db: Session = Depends(get_db)):
    service = PredictionService(db)
    pred = service.get_prediction_for_constituency(constituency_id)
    if not pred:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No prediction found for this constituency")
    return pred


@router.post("/", response_model=PredictionResponse, status_code=status.HTTP_201_CREATED)
def create_prediction(data: PredictionCreate, db: Session = Depends(get_db)):
    service = PredictionService(db)
    return service.create_prediction(data)
