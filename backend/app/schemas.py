from typing import List, Optional
from datetime import date

from pydantic import BaseModel


class Champion(BaseModel):
    id: int
    name: str
    icon_url: str

    class Config:
        orm_mode = True


class Skin(BaseModel):
    id: int
    name: str
    trimmed_image_url: str
    full_image_url: str
    price: int
    sale_price: int
    champion_id: int

    class Config:
        orm_mode = True


class Price_History(BaseModel):
    skin_id: int
    date: date
    price: int
    sale_price: int

    class Config:
        orm_mode = True


class Skin_Full(Skin):
    description: Optional[str] = None
    price_history: List[Price_History] = []
