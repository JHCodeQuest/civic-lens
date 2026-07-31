from pydantic import Field
from app.schemas.base import CamelCaseSchema, BaseResponse


class ConstituencyBase(CamelCaseSchema):
    name: str = Field(..., min_length=1, max_length=100)
    region: str = Field(..., max_length=50)
    country: str | None = Field(None, max_length=50)
    electorate: str | None = None


class ConstituencyCreate(ConstituencyBase):
    pass


class ConstituencyResponse(BaseResponse, ConstituencyBase):
    # Stable, name-derived identifier used for frontend routing. The static
    # export pre-builds one page per slug, so links must use this and not `id`.
    slug: str
    winner: str | None = None
    winning_party_id: str | None = None
    majority: int | None = None
    turnout: float | None = None
