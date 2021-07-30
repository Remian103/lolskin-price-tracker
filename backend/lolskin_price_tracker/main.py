from typing import List

import requests
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.sqltypes import DateTime

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/champion/{champion_name}/skins/", response_model=List[schemas.Skin])
def get_skins_by_champion_name(champion_name: str, db: Session = Depends(get_db)):
    skins = crud.get_skins_by_champion_name(db, champion_name)
    return skins


@app.get("/champion/{champion_name}/skins/{skin_id}/sale_records/", response_model=List[schemas.Sale_Record])
def get_sale_records_by_skin_id(champion_name: str, skin_id: int, db: Session = Depends(get_db)):
    sale_records = crud.get_sale_records(db, skin_id)
    return sale_records


@app.get("/command/update/champion/{champion_name}")
def update_champion_skins(champion_name: str, db: Session = Depends(get_db)):
    res = requests.get(f'http://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion/{champion_name}.json')
    champion_raw = res.json()['data'][champion_name]
    skins_raw = champion_raw['skins']
    for skin_raw in skins_raw:
        crud.create_skin(db, skin_raw['id'], skin_raw['name'], champion_raw['key'], champion_raw['id'])
    return True
