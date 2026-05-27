from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.election_service import ElectionService
from app.schemas.election_result import ElectionResultResponse, ElectionResultCreate

router = APIRouter()


@router.get("/")
def list_elections(db: Session = Depends(get_db)):
    service = ElectionService(db)
    return {"elections": service.list_elections()}


@router.get("/{year}/results", response_model=list[ElectionResultResponse])
def get_election_results(year: int, db: Session = Depends(get_db)):
    service = ElectionService(db)
    results = service.get_results_by_year(year)
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No results found for this year")
    return results


@router.post("/results", response_model=ElectionResultResponse, status_code=status.HTTP_201_CREATED)
def add_result(data: ElectionResultCreate, db: Session = Depends(get_db)):
    service = ElectionService(db)
    return service.add_result(data)
