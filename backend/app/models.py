from datetime import datetime
from sqlalchemy import Table, Column, ForeignKey, Boolean, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship

from .database import Base


Base.__repr__ = lambda self: f'{self.__class__.__name__}({", ".join([f"{k}={v!r}" for k, v in self.__dict__.items() if not k.startswith("_")])})'


class Champion(Base):
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String, nullable=False)
    icon_url = Column(String)

    skins = relationship('Skin', back_populates='champion')


class Skin(Base):
    __tablename__ = 'skins'

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String, nullable=False)
    trimmed_image_url = Column(String)
    full_image_url = Column(String)
    champion_id = Column(Integer, ForeignKey('champions.id'), nullable=False)
    description = Column(String)

    champion = relationship('Champion', back_populates='skins')
    price_history = relationship('PriceHistory', back_populates='skin')
    comments = relationship('Comment', back_populates='skin')


class PriceHistory(Base):
    __tablename__ = 'price_history'

    skin_id = Column(Integer, ForeignKey('skins.id'), primary_key=True)
    date = Column(Date, primary_key=True)
    price = Column(Integer)
    sale_price = Column(Integer)
    is_available = Column(Boolean, nullable=False, server_default='false', default=False)

    skin = relationship('Skin', back_populates='price_history')


like_table = Table('likes', Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('comment_id', ForeignKey('comments.id'), primary_key=True)
)


dislike_table = Table('dislikes', Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('comment_id', ForeignKey('comments.id'), primary_key=True)
)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email_address = Column(String, unique=True, nullable=False)

    comments = relationship('Comment', back_populates='author')

    liked_comments = relationship(
        'Comment',
        secondary=like_table,
        back_populates='users_liked'
    )

    disliked_comments = relationship(
        'Comment',
        secondary=dislike_table,
        back_populates='users_disliked'
    )


class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    skin_id = Column(Integer, ForeignKey('skins.id'), nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    content = Column(String, nullable=False)
    created = Column(DateTime, default=datetime.today, nullable=False)
    last_modified = Column(DateTime, default=datetime.today, nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    dislikes = Column(Integer, default=0, nullable=False)

    skin = relationship('Skin', back_populates='comments')
    author = relationship('User', back_populates='comments')

    users_liked = relationship(
        'User',
        secondary=like_table,
        back_populates='liked_comments'
    )

    users_disliked = relationship(
        'User',
        secondary=dislike_table,
        back_populates='disliked_comments'
    )
