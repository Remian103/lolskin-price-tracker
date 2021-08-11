from typing import List
from datetime import datetime

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
    image_url: str
    price: int
    sale_price: int
    champion_id: int

    class Config:
        orm_mode = True


class Sale_Record(BaseModel):
    skin_id: int
    timestamp: datetime
    price: int
    discounted_price: int

    class Config:
        orm_mode = True

