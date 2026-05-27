from sqlalchemy import Column, String
from app.models.base import BaseModel


class Constituency(BaseModel):
    __tablename__ = "constituencies"

    name = Column(String(100), unique=True, nullable=False, index=True)
    region = Column(String(50), nullable=False, index=True)
    country = Column(String(50), nullable=True)
    electorate = Column(String(20), nullable=True)
