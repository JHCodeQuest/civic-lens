import json
from pydantic import Field, field_validator
from typing import Any
from app.schemas.base import CamelCaseSchema, BaseResponse


class PartyBase(CamelCaseSchema):
    name: str = Field(..., min_length=1, max_length=100)
    colour: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    colour_secondary: str | None = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    abbreviation: str | None = Field(None, max_length=10)
    leader: str | None = Field(None, max_length=100)
    founded: int | None = Field(None, ge=1800, le=2030)
    position: str | None = Field(None, max_length=50)
    description: str | None = None
    summary: str | None = None
    region: str | None = Field(None, max_length=50)
    priorities: list[str] | None = None

    @field_validator("priorities", mode="before")
    @classmethod
    def parse_priorities(cls, v: Any) -> Any:
        if isinstance(v, str):
            try:
                return json.loads(v)
            except (json.JSONDecodeError, TypeError):
                return [v]
        return v


class PartyCreate(PartyBase):
    pass


class PartyUpdate(CamelCaseSchema):
    name: str | None = Field(None, min_length=1, max_length=100)
    colour: str | None = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    colour_secondary: str | None = None
    abbreviation: str | None = None
    leader: str | None = None
    founded: int | None = None
    position: str | None = None
    description: str | None = None
    summary: str | None = None
    region: str | None = None
    priorities: list[str] | None = None


class PartyResponse(BaseResponse, PartyBase):
    seats: int = 0
    vote_share: float = 0.0


class PartyHistoryItem(CamelCaseSchema):
    year: int
    seats: int = 0
    vote_share: float | None = None
    total_votes: int = 0


class PartyConstituencyItem(CamelCaseSchema):
    id: str
    name: str
    region: str
    winner: bool = True
    majority: int | None = None
