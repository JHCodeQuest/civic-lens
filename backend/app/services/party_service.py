from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.election_result import ElectionResult as ElectionResultModel
from app.repositories.party_repo import PartyRepository
from app.repositories.election_result_repo import ElectionResultRepository
from app.schemas.party import PartyResponse, PartyCreate, PartyUpdate


class PartyService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.party_repo = PartyRepository(db)
        self.election_repo = ElectionResultRepository(db)

    def list_parties(self, year: int | None = None) -> list[PartyResponse]:
        parties = self.party_repo.list_all()
        latest_year = year or self._get_latest_election_year()
        seat_counts = self._compute_seat_counts(latest_year)
        vote_shares = self._compute_vote_shares(latest_year)

        return [
            PartyResponse(
                id=p.id,
                name=p.name,
                colour=p.colour,
                colour_secondary=p.colour_secondary,
                abbreviation=p.abbreviation,
                leader=p.leader,
                founded=p.founded,
                position=p.position,
                description=p.description,
                seats=seat_counts.get(p.id, 0),
                vote_share=vote_shares.get(p.id, 0.0),
                created_at=p.created_at,
                updated_at=p.updated_at,
            )
            for p in parties
        ]

    def get_party(self, party_id: str) -> PartyResponse | None:
        party = self.party_repo.get_by_id(party_id)
        if not party:
            return None
        latest_year = self._get_latest_election_year()
        seat_counts = self._compute_seat_counts(latest_year)
        vote_shares = self._compute_vote_shares(latest_year)

        return PartyResponse(
            id=party.id,
            name=party.name,
            colour=party.colour,
            colour_secondary=party.colour_secondary,
            abbreviation=party.abbreviation,
            leader=party.leader,
            founded=party.founded,
            position=party.position,
            description=party.description,
            seats=seat_counts.get(party.id, 0),
            vote_share=vote_shares.get(party.id, 0.0),
            created_at=party.created_at,
            updated_at=party.updated_at,
        )

    def create_party(self, data: PartyCreate) -> PartyResponse:
        party = self.party_repo.create(**data.model_dump())
        return PartyResponse(
            id=party.id,
            name=party.name,
            colour=party.colour,
            colour_secondary=party.colour_secondary,
            abbreviation=party.abbreviation,
            leader=party.leader,
            founded=party.founded,
            position=party.position,
            description=party.description,
            created_at=party.created_at,
            updated_at=party.updated_at,
        )

    def update_party(self, party_id: str, data: PartyUpdate) -> PartyResponse | None:
        party = self.party_repo.get_by_id(party_id)
        if not party:
            return None
        updated = self.party_repo.update(party, **data.model_dump(exclude_none=True))
        return PartyResponse(
            id=updated.id,
            name=updated.name,
            colour=updated.colour,
            colour_secondary=updated.colour_secondary,
            abbreviation=updated.abbreviation,
            leader=updated.leader,
            founded=updated.founded,
            position=updated.position,
            description=updated.description,
            created_at=updated.created_at,
            updated_at=updated.updated_at,
        )

    def delete_party(self, party_id: str) -> bool:
        party = self.party_repo.get_by_id(party_id)
        if not party:
            return False
        self.party_repo.delete(party)
        return True

    def _compute_seat_counts(self, year: int | None) -> dict[str, int]:
        if not year:
            return {}
        seat_rows = self.election_repo.count_seats_by_party(year)
        return {pid: count for pid, count in seat_rows}

    def _compute_vote_shares(self, year: int | None) -> dict[str, float]:
        if not year:
            return {}
        stmt_total = select(func.sum(ElectionResultModel.votes)).where(ElectionResultModel.year == year)
        grand_total = self.db.execute(stmt_total).scalar()
        if not grand_total:
            return {}

        stmt_party = (
            select(ElectionResultModel.party_id, func.sum(ElectionResultModel.votes))
            .where(ElectionResultModel.year == year)
            .group_by(ElectionResultModel.party_id)
        )
        shares: dict[str, float] = {}
        for pid, total in self.db.execute(stmt_party).all():
            shares[pid] = round((total / grand_total) * 100, 1)
        return shares

    def _get_latest_election_year(self) -> int | None:
        years = self.election_repo.get_available_years()
        return years[0] if years else None
