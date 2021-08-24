from sqlalchemy import Column, ForeignKey, Integer, String, Date, DDL
from sqlalchemy.orm import relationship

from .database import Base


class Champion(Base):
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    icon_url = Column(String)

    skins = relationship('Skin', back_populates='champion')

    def __repr__(self) -> str:
        return f'Champion(id={self.id!r}, name={self.name!r}, icon_url={self.icon_url!r})'


class Skin(Base):
    __tablename__ = 'skins'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    trimmed_image_url = Column(String)
    full_image_url = Column(String)
    price = Column(Integer, default=0)
    sale_price = Column(Integer, default=0)
    update_date = Column(Date)
    champion_id = Column(Integer, ForeignKey('champions.id'))

    description = Column(String, default='')

    champion = relationship('Champion', back_populates='skins')
    price_history = relationship('Price_History', back_populates='skin')

    def __repr__(self) -> str:
        return (f'Skin(id={self.id!r}, name={self.name!r}, image_url={self.image_url!r}, '
                + f'price={self.price!r}, sale_price={self.sale_price!r}, champion_id={self.champion_id!r})')


class Price_History(Base):
    __tablename__ = 'price_history'

    skin_id = Column(Integer, ForeignKey('skins.id'), primary_key=True)
    date = Column(Date, primary_key=True)
    price = Column(Integer, default=0)
    sale_price = Column(Integer, default=0)

    skin = relationship('Skin', back_populates='price_history')

    def __repr__(self) -> str:
        return f'Price_History(skin_id={self.skin_id!r}, date={self.date!r}, price={self.price!r}, sale_price={self.sale_price!r})'


update_prices_ddl = DDL('''\
    CREATE TRIGGER update_prices INSERT ON price_history
        BEGIN
            UPDATE skins SET price = NEW.price WHERE (id = NEW.skin_id) AND (update_date is NULL or update_date<=NEW.date);
            UPDATE skins SET sale_price = NEW.sale_price WHERE (id = NEW.skin_id) AND (update_date is NULL or update_date<=NEW.date);
        END;''')
drop_update_prices_ddl = DDL('DROP TRIGGER update_prices;')
# event.listen(Table, 'after_create', update_prices_ddl)