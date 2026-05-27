from pydantic import Field
from app.schemas.base import CamelCaseSchema, BaseResponse


class ElectionResultBase(CamelCaseSchema):
    constituency_id: str = Field(..., min_length=1)
    party_id: str = Field(..., min_length=1)
    year: int = Field(..., ge=1800, le=2030)
    votes: int = Field(..., ge=0)
    share: float | None = None
    change: float | None = None
    position: int | None = None
    source: str | None = None


class ElectionResultCreate(ElectionResultBase):
    pass


class ElectionResultResponse(BaseResponse, ElectionResultBase):
    constituency_name: str | None = None
    party_name: str | None = None
    party_colour: str | None = None
