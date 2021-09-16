from typing import List, Optional
from datetime import date, datetime

from pydantic import BaseModel


class Champion(BaseModel):
    id: int
    name: str
    icon_url: Optional[str]

    class Config:
        orm_mode = True


class Price_History(BaseModel):
    skin_id: int
    date: date
    price: Optional[int]
    sale_price: Optional[int]
    is_available: bool

    class Config:
        orm_mode = True


class Skin(BaseModel):
    id: int
    name: str
    trimmed_image_url: Optional[str]
    full_image_url: Optional[str]
    champion_id: int
    last_price_history: Optional[Price_History]

    class Config:
        orm_mode = True


class SkinFull(Skin):
    description: Optional[str]
    price_history: List[Price_History] = []



class UserDataOnComment(BaseModel):
    is_modifiable: bool
    is_liked: bool
    is_disliked: bool


class CommentBase(BaseModel):
    skin_id: int
    content: str


class CommentCreate(CommentBase):
    author_id: int
    pass


class Comment(CommentBase):
    id: int
    created: datetime
    last_modified: datetime
    likes: int
    dislikes: int
    current_user_auth: Optional[UserDataOnComment]

    class Config:
        orm_mode = True


class CommentsList(BaseModel):
    skin_id: int
    num_comments: int
    skip: int
    limit: int
    order_by: str
    comments: List[Comment]

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email_address: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    comments: List[Comment] = []
