from pydantic import BaseModel

class Party(BaseModel):
    id: str
    name: str
    seats: int = 0
    vote_share: float = 0.0
