from typing import List
from datetime import datetime

from pydantic import BaseModel

class Champion(BaseModel):
    id: int
    name: str
    icon_url: str


class Sale_Record(BaseModel):
    skin_id: int
    timestamp: datetime
    price: int
    discounted_price: int

    class Config:
        orm_mode = True


class Skin(BaseModel):
    id: int
    name: str
    champion_id: int
    champion_name: str
    sale_records: List[Sale_Record] = []

    class Config:
        orm_mode = True
