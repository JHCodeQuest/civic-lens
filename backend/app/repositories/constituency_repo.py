from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.constituency import Constituency
from app.repositories.base import BaseRepository


class ConstituencyRepository(BaseRepository[Constituency]):
    def __init__(self, db: Session) -> None:
        super().__init__(db, Constituency)

    def get_by_name(self, name: str) -> Constituency | None:
        stmt = select(Constituency).where(Constituency.name == name)
        return self.db.execute(stmt).scalar_one_or_none()

    def list_by_region(self, region: str) -> list[Constituency]:
        stmt = select(Constituency).where(Constituency.region == region)
        return list(self.db.execute(stmt).scalars().all())

    def list_by_country(self, country: str) -> list[Constituency]:
        stmt = select(Constituency).where(Constituency.country == country)
        return list(self.db.execute(stmt).scalars().all())
