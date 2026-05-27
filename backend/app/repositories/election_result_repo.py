from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.election_result import ElectionResult
from app.repositories.base import BaseRepository


class ElectionResultRepository(BaseRepository[ElectionResult]):
    def __init__(self, db: Session) -> None:
        super().__init__(db, ElectionResult)

    def get_by_constituency_and_year(self, constituency_id: str, year: int) -> list[ElectionResult]:
        stmt = (
            select(ElectionResult)
            .where(ElectionResult.constituency_id == constituency_id)
            .where(ElectionResult.year == year)
            .order_by(ElectionResult.votes.desc())
        )
        return list(self.db.execute(stmt).scalars().all())

    def get_by_party_and_year(self, party_id: str, year: int) -> list[ElectionResult]:
        stmt = (
            select(ElectionResult)
            .where(ElectionResult.party_id == party_id)
            .where(ElectionResult.year == year)
        )
        return list(self.db.execute(stmt).scalars().all())

    def get_available_years(self) -> list[int]:
        stmt = select(ElectionResult.year).distinct().order_by(ElectionResult.year.desc())
        return [row[0] for row in self.db.execute(stmt).all()]

    def get_winner_for_constituency(self, constituency_id: str, year: int) -> ElectionResult | None:
        stmt = (
            select(ElectionResult)
            .where(ElectionResult.constituency_id == constituency_id)
            .where(ElectionResult.year == year)
            .order_by(ElectionResult.votes.desc())
            .limit(1)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def count_seats_by_party(self, year: int) -> list[tuple[str, int]]:
        stmt = (
            select(
                ElectionResult.party_id,
                func.count(ElectionResult.constituency_id).label("seats"),
            )
            .where(ElectionResult.year == year)
            .where(ElectionResult.position == 1)
            .group_by(ElectionResult.party_id)
            .order_by(func.count(ElectionResult.constituency_id).desc())
        )
        return [(row.party_id, row.seats) for row in self.db.execute(stmt).all()]
