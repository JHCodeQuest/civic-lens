from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.party_service import PartyService
from app.schemas.party import PartyResponse, PartyCreate, PartyUpdate, PartyHistoryItem, PartyConstituencyItem

router = APIRouter()


@router.get("/", response_model=list[PartyResponse])
def list_parties(year: int | None = Query(None, description="Filter seats by election year"), db: Session = Depends(get_db)):
    service = PartyService(db)
    return service.list_parties(year=year)


@router.get("/by-slug/{slug}", response_model=PartyResponse)
def get_party_by_slug(slug: str, db: Session = Depends(get_db)):
    service = PartyService(db)
    party = service.get_party_by_slug(slug)
    if not party:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
    return party


@router.get("/{party_id}", response_model=PartyResponse)
def get_party(party_id: str, db: Session = Depends(get_db)):
    service = PartyService(db)
    party = service.get_party(party_id)
    if not party:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
    return party


@router.get("/{party_id}/history", response_model=list[PartyHistoryItem])
def get_party_history(party_id: str, db: Session = Depends(get_db)):
    service = PartyService(db)
    return service.get_party_history(party_id)


@router.get("/{party_id}/constituencies", response_model=list[PartyConstituencyItem])
def get_party_constituencies(
    party_id: str,
    year: int | None = Query(None, description="Election year"),
    db: Session = Depends(get_db),
):
    service = PartyService(db)
    latest = service._get_latest_election_year()
    return service.get_party_constituencies(party_id, year or latest or 2024)


@router.post("/", response_model=PartyResponse, status_code=status.HTTP_201_CREATED)
def create_party(data: PartyCreate, db: Session = Depends(get_db)):
    service = PartyService(db)
    return service.create_party(data)


@router.put("/{party_id}", response_model=PartyResponse)
def update_party(party_id: str, data: PartyUpdate, db: Session = Depends(get_db)):
    service = PartyService(db)
    party = service.update_party(party_id, data)
    if not party:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
    return party


@router.delete("/{party_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_party(party_id: str, db: Session = Depends(get_db)):
    service = PartyService(db)
    if not service.delete_party(party_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
