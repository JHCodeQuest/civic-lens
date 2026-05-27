from sqlalchemy import Column, String, Integer, Float, ForeignKey, Date
from app.models.base import BaseModel


class Poll(BaseModel):
    __tablename__ = "polls"

    party_id = Column(String(36), ForeignKey("parties.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    percentage = Column(Float, nullable=False)
    sample_size = Column(Integer, nullable=True)
    source = Column(String(100), nullable=True)
    polling_company = Column(String(100), nullable=True)
