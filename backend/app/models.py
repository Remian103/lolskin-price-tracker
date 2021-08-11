from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Champion(Base):
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    icon_url = Column(String)

    def __repr__(self):
        return f'Champion(id={self.id}, name=\'{self.name}\', icon_url=\'{self.icon_url}\')'


class Skin(Base):
    __tablename__ = 'skins'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    image_url = Column(String)
    price = Column(Integer)
    sale_price = Column(Integer)
    champion_id = Column(Integer, ForeignKey('champions.id'))


class Sale_Record(Base):
    __tablename__ = "sale_records"

    skin_id = Column(Integer, ForeignKey("skins.id"), primary_key=True)
    timestamp = Column(DateTime, primary_key=True)
    price = Column(Integer)
    discounted_price = Column(Integer)

    skin = relationship("Skin", back_populates="sale_records")
