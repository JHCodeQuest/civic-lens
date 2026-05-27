from datetime import date
from sqlalchemy.orm import Session

from app.repositories.poll_repo import PollRepository
from app.repositories.party_repo import PartyRepository
from app.schemas.poll import PollResponse, PollCreate


class PollingService:
    def __init__(self, db: Session) -> None:
        self.poll_repo = PollRepository(db)
        self.party_repo = PartyRepository(db)

    def list_polls(self) -> list[PollResponse]:
        polls = self.poll_repo.list_all()
        return [self._to_response(p) for p in polls]

    def get_latest(self) -> list[PollResponse]:
        polls = self.poll_repo.get_latest_all_parties()
        return [self._to_response(p) for p in polls]

    def get_by_party(self, party_id: str) -> list[PollResponse]:
        polls = self.poll_repo.get_by_party(party_id)
        return [self._to_response(p) for p in polls]

    def get_by_date_range(self, start: date, end: date) -> list[PollResponse]:
        polls = self.poll_repo.get_by_date_range(start, end)
        return [self._to_response(p) for p in polls]

    def add_poll(self, data: PollCreate) -> PollResponse:
        poll = self.poll_repo.create(**data.model_dump())
        return self._to_response(poll)

    def _to_response(self, poll) -> PollResponse:
        party = self.party_repo.get_by_id(poll.party_id)
        return PollResponse(
            id=poll.id,
            party_id=poll.party_id,
            date=poll.date,
            percentage=poll.percentage,
            sample_size=poll.sample_size,
            source=poll.source,
            polling_company=poll.polling_company,
            party_name=party.name if party else None,
            party_colour=party.colour if party else None,
            created_at=poll.created_at,
            updated_at=poll.updated_at,
        )
