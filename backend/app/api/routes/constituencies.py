from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.repositories.constituency_repo import ConstituencyRepository
from app.repositories.election_result_repo import ElectionResultRepository
from app.repositories.party_repo import PartyRepository
from app.schemas.constituency import ConstituencyResponse

router = APIRouter()


@router.get("/", response_model=list[ConstituencyResponse])
def list_constituencies(
    region: str | None = Query(None, description="Filter by region"),
    country: str | None = Query(None, description="Filter by country"),
    year: int | None = Query(None, description="Election year for winner/majority data"),
    db: Session = Depends(get_db),
):
    const_repo = ConstituencyRepository(db)
    election_repo = ElectionResultRepository(db)
    party_repo = PartyRepository(db)

    if region:
        constituencies = const_repo.list_by_region(region)
    elif country:
        constituencies = const_repo.list_by_country(country)
    else:
        constituencies = const_repo.list_all()

    latest_year = year or _get_latest_year(election_repo)

    return [
        _enrich_constituency(c, election_repo, party_repo, latest_year)
        for c in constituencies
    ]


@router.get("/{constituency_id}", response_model=ConstituencyResponse)
def get_constituency(
    constituency_id: str,
    year: int | None = Query(None, description="Election year for winner/majority data"),
    db: Session = Depends(get_db),
):
    const_repo = ConstituencyRepository(db)
    election_repo = ElectionResultRepository(db)
    party_repo = PartyRepository(db)

    c = const_repo.get_by_id(constituency_id)
    if not c:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Constituency not found")

    latest_year = year or _get_latest_year(election_repo)
    return _enrich_constituency(c, election_repo, party_repo, latest_year)


def _enrich_constituency(
    c,
    election_repo: ElectionResultRepository,
    party_repo: PartyRepository,
    year: int | None,
) -> ConstituencyResponse:
    winner = None
    majority = None
    winning_party_id = None

    if year:
        winner_result = election_repo.get_winner_for_constituency(c.id, year)
        if winner_result:
            party = party_repo.get_by_id(winner_result.party_id)
            winner = party.name if party else None
            winning_party_id = winner_result.party_id

            all_results = election_repo.get_by_constituency_and_year(c.id, year)
            if len(all_results) >= 2:
                majority = winner_result.votes - all_results[1].votes

    return ConstituencyResponse(
        id=c.id,
        name=c.name,
        region=c.region,
        country=c.country,
        electorate=c.electorate,
        winner=winner,
        winning_party_id=winning_party_id,
        majority=majority,
        turnout=None,
        created_at=c.created_at,
        updated_at=c.updated_at,
    )


def _get_latest_year(election_repo: ElectionResultRepository) -> int | None:
    years = election_repo.get_available_years()
    return years[0] if years else None
