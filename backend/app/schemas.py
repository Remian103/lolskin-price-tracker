from typing import List, Optional
from datetime import date, datetime

from pydantic import BaseModel, Field


class Champion(BaseModel):
    id: int
    name: str
    icon_url: str

    class Config:
        orm_mode = True


class Price_History(BaseModel):
    skin_id: int
    date: date
    price: int
    sale_price: int
    is_available: bool
    is_on_sale: bool

    class Config:
        orm_mode = True


class Skin(BaseModel):
    id: int
    name: str
    trimmed_image_url: str
    full_image_url: str
    price: int = Field(
        None, deprecated=True, description='Use `price` in new `last_price_history`'
    )
    sale_price: int = Field(
        None, deprecated=True, description='Use `sale_price` in new `last_price_history`'
    )
    champion_id: int
    last_price_history: Optional[Price_History] = None

    class Config:
        orm_mode = True


class Skin_Full(Skin):
    description: Optional[str] = None
    price_history: List[Price_History] = []


class CommentBase(BaseModel):
    skin_id: int
    author_username: str
    content: str


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int
    created: datetime
    last_modified: datetime
    likes: int
    dislikes: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email_address: str
    username: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    comments: List[Comment] = []
