from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.party import Party
from app.repositories.base import BaseRepository
from app.utils.helpers import slugify as _slugify


class PartyRepository(BaseRepository[Party]):
    def __init__(self, db: Session) -> None:
        super().__init__(db, Party)

    def get_by_name(self, name: str) -> Party | None:
        stmt = select(Party).where(Party.name == name)
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_abbreviation(self, abbrev: str) -> Party | None:
        stmt = select(Party).where(Party.abbreviation == abbrev)
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_slug(self, slug: str) -> Party | None:
        all_parties = self.list_all()
        for party in all_parties:
            if _slugify(party.name) == slug:
                return party
        return None
