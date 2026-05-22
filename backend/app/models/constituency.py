from pydantic import BaseModel

class Constituency(BaseModel):
    id: str
    name: str
    region: str
    winner: str
    majority: int
    turnout: float = 0.0
