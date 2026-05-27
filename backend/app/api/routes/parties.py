from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.party_service import PartyService
from app.schemas.party import PartyResponse, PartyCreate, PartyUpdate

router = APIRouter()


@router.get("/", response_model=list[PartyResponse])
def list_parties(year: int | None = Query(None, description="Filter seats by election year"), db: Session = Depends(get_db)):
    service = PartyService(db)
    return service.list_parties(year=year)


@router.get("/{party_id}", response_model=PartyResponse)
def get_party(party_id: str, db: Session = Depends(get_db)):
    service = PartyService(db)
    party = service.get_party(party_id)
    if not party:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
    return party


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
