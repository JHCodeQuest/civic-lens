from sqlalchemy import Column, String, Integer, Text
from app.models.base import BaseModel


class Party(BaseModel):
    __tablename__ = "parties"

    name = Column(String(100), unique=True, nullable=False, index=True)
    colour = Column(String(7), nullable=False)
    colour_secondary = Column(String(7), nullable=True)
    abbreviation = Column(String(10), nullable=True, unique=True)
    leader = Column(String(100), nullable=True)
    founded = Column(Integer, nullable=True)
    position = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    region = Column(String(50), nullable=True)
    priorities = Column(Text, nullable=True)
