from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Skin(Base):
    __tablename__ = "skins"

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    champion_id = Column(Integer, index=True)
    champion_name = Column(String, index=True)

    sale_records = relationship("Sale_Record", back_populates="skin")


class Sale_Record(Base):
    __tablename__ = "sale_records"

    skin_id = Column(Integer, ForeignKey("skins.id"), primary_key=True)
    timestamp = Column(DateTime, primary_key=True)
    price = Column(Integer)
    discounted_price = Column(Integer)

    skin = relationship("Skin", back_populates="sale_records")
