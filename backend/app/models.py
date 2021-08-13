from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Champion(Base):
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    icon_url = Column(String)

    skins = relationship('Skin', back_populates='champion')

    def __repr__(self):
        return f'Champion(id={self.id!r}, name={self.name!r}, icon_url={self.icon_url!r})'


class Skin(Base):
    __tablename__ = 'skins'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    image_url = Column(String)
    price = Column(Integer)
    sale_price = Column(Integer)
    champion_id = Column(Integer, ForeignKey('champions.id'))

    champion = relationship('Champion', back_populates='skins')

    def __repr__(self):
        return (f'Skin(id={self.id!r}, name={self.name!r}, image_url={self.image_url!r}, '
                + f'price={self.price!r}, sale_price={self.sale_price!r}, champion_id={self.champion_id!r})')


class Sale_Record(Base):
    __tablename__ = "sale_records"

    skin_id = Column(Integer, ForeignKey("skins.id"), primary_key=True)
    timestamp = Column(DateTime, primary_key=True)
    price = Column(Integer)
    discounted_price = Column(Integer)
