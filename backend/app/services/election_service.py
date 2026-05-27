from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.election_result import ElectionResult as ElectionResultModel
from app.repositories.election_result_repo import ElectionResultRepository
from app.repositories.constituency_repo import ConstituencyRepository
from app.repositories.party_repo import PartyRepository
from app.schemas.election_result import ElectionResultResponse, ElectionResultCreate


class ElectionService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.election_repo = ElectionResultRepository(db)
        self.constituency_repo = ConstituencyRepository(db)
        self.party_repo = PartyRepository(db)

    def list_elections(self) -> list[dict]:
        years = self.election_repo.get_available_years()
        return [{"year": y, "total_constituencies": self._count_constituencies_for_year(y)} for y in years]

    def get_results_by_year(self, year: int) -> list[ElectionResultResponse]:
        years = self.election_repo.get_available_years()
        if year not in years:
            return []

        stmt = (
            select(ElectionResultModel)
            .where(ElectionResultModel.year == year)
            .order_by(ElectionResultModel.constituency_id, ElectionResultModel.votes.desc())
        )
        erows = list(self.db.execute(stmt).scalars().all())

        return [self._to_response(er) for er in erows]

    def get_constituency_result(self, constituency_id: str, year: int) -> list[ElectionResultResponse]:
        results = self.election_repo.get_by_constituency_and_year(constituency_id, year)
        return [self._to_response(r) for r in results]

    def add_result(self, data: ElectionResultCreate) -> ElectionResultResponse:
        result = self.election_repo.create(**data.model_dump())
        return self._to_response(result)

    def _to_response(self, er: ElectionResultModel) -> ElectionResultResponse:
        const = self.constituency_repo.get_by_id(er.constituency_id)
        party = self.party_repo.get_by_id(er.party_id)
        return ElectionResultResponse(
            id=er.id,
            constituency_id=er.constituency_id,
            party_id=er.party_id,
            year=er.year,
            votes=er.votes,
            share=er.share,
            change=er.change,
            position=er.position,
            source=er.source,
            constituency_name=const.name if const else None,
            party_name=party.name if party else None,
            party_colour=party.colour if party else None,
            created_at=er.created_at,
            updated_at=er.updated_at,
        )

    def _count_constituencies_for_year(self, year: int) -> int:
        stmt = (
            select(func.count(ElectionResultModel.constituency_id.distinct()))
            .where(ElectionResultModel.year == year)
        )
        result = self.db.execute(stmt).scalar()
        return result or 0
