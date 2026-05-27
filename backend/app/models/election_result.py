from sqlalchemy import Column, String, Integer, Float, ForeignKey, UniqueConstraint
from app.models.base import BaseModel


class ElectionResult(BaseModel):
    __tablename__ = "election_results"

    constituency_id = Column(String(36), ForeignKey("constituencies.id"), nullable=False, index=True)
    party_id = Column(String(36), ForeignKey("parties.id"), nullable=False, index=True)
    year = Column(Integer, nullable=False, index=True)
    votes = Column(Integer, nullable=False)
    share = Column(Float, nullable=True)
    change = Column(Float, nullable=True)
    position = Column(Integer, nullable=True)
    source = Column(String(100), nullable=True)

    __table_args__ = (
        UniqueConstraint("constituency_id", "party_id", "year", name="uq_result_per_election"),
    )
