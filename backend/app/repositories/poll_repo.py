from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.poll import Poll
from app.repositories.base import BaseRepository


class PollRepository(BaseRepository[Poll]):
    def __init__(self, db: Session) -> None:
        super().__init__(db, Poll)

    def get_by_party(self, party_id: str) -> list[Poll]:
        stmt = (
            select(Poll)
            .where(Poll.party_id == party_id)
            .order_by(Poll.date.desc())
        )
        return list(self.db.execute(stmt).scalars().all())

    def get_latest_by_party(self, party_id: str) -> Poll | None:
        stmt = (
            select(Poll)
            .where(Poll.party_id == party_id)
            .order_by(Poll.date.desc())
            .limit(1)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def get_latest_all_parties(self) -> list[Poll]:
        subq = (
            select(Poll.party_id, Poll.date.label("max_date"))
            .distinct(Poll.party_id)
            .order_by(Poll.party_id, Poll.date.desc())
            .subquery()
        )
        stmt = (
            select(Poll)
            .join(subq, (Poll.party_id == subq.c.party_id) & (Poll.date == subq.c.max_date))
            .order_by(Poll.percentage.desc())
        )
        return list(self.db.execute(stmt).scalars().all())

    def get_by_date_range(self, start: date, end: date) -> list[Poll]:
        stmt = (
            select(Poll)
            .where(Poll.date >= start)
            .where(Poll.date <= end)
            .order_by(Poll.date)
        )
        return list(self.db.execute(stmt).scalars().all())
