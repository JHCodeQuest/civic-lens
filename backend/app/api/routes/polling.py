from datetime import date
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.polling_service import PollingService
from app.schemas.poll import PollResponse, PollCreate

router = APIRouter()


@router.get("/", response_model=list[PollResponse])
def list_polling(
    start: date | None = Query(None, description="Start date (YYYY-MM-DD)"),
    end: date | None = Query(None, description="End date (YYYY-MM-DD)"),
    party_id: str | None = Query(None, description="Filter by party ID"),
    db: Session = Depends(get_db),
):
    service = PollingService(db)
    if start and end:
        return service.get_by_date_range(start, end)
    if party_id:
        return service.get_by_party(party_id)
    return service.list_polls()


@router.get("/latest", response_model=list[PollResponse])
def get_latest_polling(db: Session = Depends(get_db)):
    service = PollingService(db)
    return service.get_latest()


@router.post("/", response_model=PollResponse, status_code=status.HTTP_201_CREATED)
def add_poll(data: PollCreate, db: Session = Depends(get_db)):
    service = PollingService(db)
    return service.add_poll(data)
