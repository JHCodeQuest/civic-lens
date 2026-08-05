from sqlalchemy import (
    Column,
    String,
    Integer,
    Text,
    Date,
    ForeignKey,
    UniqueConstraint,
)
from app.models.base import BaseModel


class PolicyArea(BaseModel):
    __tablename__ = "policy_areas"

    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    # Display order in the quiz; areas are shown grouped, not shuffled.
    sort_order = Column(Integer, nullable=False, default=0)


class Statement(BaseModel):
    __tablename__ = "statements"

    area_id = Column(String(36), ForeignKey("policy_areas.id"), nullable=False, index=True)
    text = Column(Text, nullable=False)
    # Election cycle the statement belongs to, e.g. "2029-general". Statements are
    # only meaningful relative to the manifestos they were written against.
    cycle = Column(String(32), nullable=False, index=True)
    sort_order = Column(Integer, nullable=False, default=0)


class PartyStance(BaseModel):
    """One party's position on one statement, for one election cycle.

    `stance` is NULL for "no clear position" — a first-class value, not missing
    data. It is excluded from scoring rather than treated as neutral, so that
    declining to take a position cannot earn a party agreement points.

    The source columns are NOT NULL by design: an unsourced stance is an opinion,
    and this tool recommends how to vote. See docs/methodology.md.
    """

    __tablename__ = "party_stances"
    __table_args__ = (
        UniqueConstraint("statement_id", "party_id", "cycle", name="uq_stance_per_cycle"),
    )

    statement_id = Column(String(36), ForeignKey("statements.id"), nullable=False, index=True)
    party_id = Column(String(36), ForeignKey("parties.id"), nullable=False, index=True)
    cycle = Column(String(32), nullable=False, index=True)

    # -2 strongly disagree .. +2 strongly agree, or NULL for no clear position.
    stance = Column(Integer, nullable=True)

    source_url = Column(String(500), nullable=False)
    source_type = Column(String(32), nullable=False)  # manifesto | voting_record | public_statement
    source_date = Column(Date, nullable=False)
    quote = Column(Text, nullable=False)
