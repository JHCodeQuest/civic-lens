from datetime import date
from pydantic import Field
from app.schemas.base import CamelCaseSchema, BaseResponse


class PollBase(CamelCaseSchema):
    party_id: str = Field(..., min_length=1)
    date: date
    percentage: float = Field(..., ge=0.0, le=100.0)
    sample_size: int | None = None
    source: str | None = None
    polling_company: str | None = None


class PollCreate(PollBase):
    pass


class PollResponse(BaseResponse, PollBase):
    party_name: str | None = None
    party_colour: str | None = None
