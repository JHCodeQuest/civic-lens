from datetime import date
from typing import Literal

from pydantic import Field, field_validator

from app.schemas.base import CamelCaseSchema, BaseResponse
from app.utils.calculations import POSITION_MAX, POSITION_MIN

SourceType = Literal["manifesto", "voting_record", "public_statement"]


class PolicyAreaBase(CamelCaseSchema):
    name: str = Field(..., min_length=1, max_length=100)
    description: str | None = None
    sort_order: int = 0


class PolicyAreaCreate(PolicyAreaBase):
    pass


class PolicyAreaResponse(BaseResponse, PolicyAreaBase):
    pass


class StatementBase(CamelCaseSchema):
    area_id: str = Field(..., min_length=1)
    text: str = Field(..., min_length=1)
    cycle: str = Field(..., min_length=1, max_length=32)
    sort_order: int = 0


class StatementCreate(StatementBase):
    pass


class StatementResponse(BaseResponse, StatementBase):
    area_name: str | None = None


class PartyStanceBase(CamelCaseSchema):
    statement_id: str = Field(..., min_length=1)
    party_id: str = Field(..., min_length=1)
    cycle: str = Field(..., min_length=1, max_length=32)

    # None means "no clear position" — excluded from scoring, never scored as neutral.
    stance: int | None = Field(None, ge=POSITION_MIN, le=POSITION_MAX)

    # Required. This tool recommends how to vote; an unsourced stance is an opinion.
    source_url: str = Field(..., min_length=1, max_length=500)
    source_type: SourceType
    source_date: date
    quote: str = Field(..., min_length=1)

    @field_validator("source_url")
    @classmethod
    def source_url_must_be_resolvable(cls, v: str) -> str:
        if not v.startswith(("http://", "https://")):
            raise ValueError("source_url must be an absolute http(s) URL")
        return v

    @field_validator("quote")
    @classmethod
    def quote_must_be_substantive(cls, v: str) -> str:
        # Guards against a placeholder slipping through review.
        if len(v.strip()) < 10:
            raise ValueError("quote must be a substantive excerpt from the source")
        return v.strip()


class PartyStanceCreate(PartyStanceBase):
    pass


class PartyStanceResponse(BaseResponse, PartyStanceBase):
    party_name: str | None = None
    statement_text: str | None = None
