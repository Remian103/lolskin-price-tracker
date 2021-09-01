from sqlalchemy import Column, ForeignKey, Boolean, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base


Base.__repr__ = lambda self: f'{self.__class__.__name__}({", ".join([f"{k}={v!r}" for k, v in self.__dict__.items() if not k.startswith("_")])})'


class Champion(Base):
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    icon_url = Column(String)

    skins = relationship('Skin', back_populates='champion')


class Skin(Base):
    __tablename__ = 'skins'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    trimmed_image_url = Column(String)
    full_image_url = Column(String)

    # ----- To be deprecated -----
    price = Column(Integer, default=0)
    sale_price = Column(Integer, default=0)
    # ----- To be deprecated -----

    champion_id = Column(Integer, ForeignKey('champions.id'))

    description = Column(String, default='')

    champion = relationship('Champion', back_populates='skins')
    price_history = relationship('Price_History', back_populates='skin')


class Price_History(Base):
    __tablename__ = 'price_history'

    skin_id = Column(Integer, ForeignKey('skins.id'), primary_key=True)
    date = Column(Date, primary_key=True)
    price = Column(Integer, default=0)
    sale_price = Column(Integer, default=0)
    is_available = Column(Boolean, nullable=False, server_default='false')
    is_on_sale = Column(Boolean, nullable=False, server_default='false')

    skin = relationship('Skin', back_populates='price_history')

