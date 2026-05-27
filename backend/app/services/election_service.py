from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.election_result import ElectionResult as ElectionResultModel
from app.models.constituency import Constituency
from app.repositories.election_result_repo import ElectionResultRepository
from app.repositories.constituency_repo import ConstituencyRepository
from app.repositories.party_repo import PartyRepository
from app.schemas.election_result import (
    ElectionResultResponse, ElectionResultCreate,
    PartySummaryResponse, NationalSummaryResponse, RegionBreakdownResponse,
)


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

    def get_national_summary(self, year: int) -> NationalSummaryResponse | None:
        years = self.election_repo.get_available_years()
        if year not in years:
            return None

        party_seats = self.election_repo.count_seats_by_party(year)
        total_seats = sum(s for _, s in party_seats)

        other_year = 2019 if year == 2024 else 2024
        party_seats_other = dict(self.election_repo.count_seats_by_party(other_year)) if other_year in years else {}

        stmt_votes = (
            select(
                ElectionResultModel.party_id,
                func.sum(ElectionResultModel.votes).label("total_votes"),
            )
            .where(ElectionResultModel.year == year)
            .group_by(ElectionResultModel.party_id)
        )
        rows = {r.party_id: {"votes": r.total_votes} for r in self.db.execute(stmt_votes).all()}

        grand_total_votes = sum(v["votes"] for v in rows.values()) or 1

        parties_list: list[PartySummaryResponse] = []
        for party_id, seats in party_seats:
            party = self.party_repo.get_by_id(party_id)
            if not party:
                continue
            vote_share = round(rows[party_id]["votes"] / grand_total_votes * 100, 1) if party_id in rows else None

            change = None
            if party_id in party_seats_other:
                prev = party_seats_other[party_id]
                change = round(seats - prev)

            parties_list.append(PartySummaryResponse(
                party_name=party.name,
                party_colour=party.colour,
                seats=seats,
                vote_share=vote_share,
                change=change,
            ))

        parties_list.sort(key=lambda p: p.seats, reverse=True)

        majority_party = None
        majority_seats = None
        if parties_list:
            top = parties_list[0]
            needed = total_seats // 2 + 1
            if top.seats >= needed:
                majority_party = top.party_name
                majority_seats = top.seats

        return NationalSummaryResponse(
            year=year,
            total_seats=total_seats,
            parties=parties_list,
            majority_party=majority_party,
            majority_seats=majority_seats,
        )

    def get_region_breakdown(self, year: int) -> list[RegionBreakdownResponse]:
        years = self.election_repo.get_available_years()
        if year not in years:
            return []

        stmt = (
            select(
                Constituency.region,
                ElectionResultModel.party_id,
                func.count(ElectionResultModel.constituency_id).label("seats"),
            )
            .join(ElectionResultModel, ElectionResultModel.constituency_id == Constituency.id)
            .where(ElectionResultModel.year == year)
            .where(ElectionResultModel.position == 1)
            .group_by(Constituency.region, ElectionResultModel.party_id)
            .order_by(Constituency.region, func.count(ElectionResultModel.constituency_id).desc())
        )
        rows = self.db.execute(stmt).all()

        region_total: dict[str, int] = {}
        region_winners: dict[str, tuple[str, str, int]] = {}
        for row in rows:
            region = row.region
            party_id = row.party_id
            seats = row.seats
            region_total[region] = region_total.get(region, 0) + seats
            if region not in region_winners:
                party = self.party_repo.get_by_id(party_id)
                if party:
                    region_winners[region] = (party.name, party.colour or "#ccc", seats)

        result = []
        for region in sorted(region_total.keys()):
            wname, wcolour, wseats = region_winners.get(region, ("Unknown", "#ccc", 0))
            result.append(RegionBreakdownResponse(
                region=region,
                winning_party=wname,
                winning_party_colour=wcolour,
                seats=wseats,
                total_constituencies=region_total[region],
            ))
        return result

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
