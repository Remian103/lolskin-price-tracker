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

@app.get('/api/champions')
def get_champions(db: Session = Depends(get_db)):
    return crud.get_champions(db)

@app.get('/api/champions/{champion_id}/skins')
def get_champion_skins():
    ...

@app.get('/api/recommendations')
def get_recommendations():
    ...

@app.get('/api/skins/{skin_id}')
def get_skin():
    ...

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
    return f"Updated {champion_name} skins info."


@app.post("/command/update/skin/{skin_id}/sale_records/")
def update_skin_sale_records(skin_id: int, sale_records: List[schemas.Sale_Record], db: Session = Depends(get_db)):
    for sale_record in sale_records:
        assert skin_id == sale_record.skin_id
        crud.create_sale_record(db, sale_record)
    return f"Updated {skin_id} sale records."


@app.get("/command/populate_test_data")
def populate_test_data():
    from datetime import datetime, timedelta
    import random
    import json
    sale_records = []
    time = datetime.now()
    for i in range(100):
        sale_records.append({
            "skin_id": 104001,        
            "timestamp": str(time + timedelta(hours=i)),
            "price": 1820,
            "discounted_price": 1820 * random.random()
        })
    LOCAL_SERVER_ADDRESS = "http://127.0.0.1:8000"
    # LOCAL_SERVER_ADDRESS = "http://172.26.241.211:8000"
    requests.post(f"{LOCAL_SERVER_ADDRESS}/command/update/skin/104001/sale_records/", data=json.dumps(sale_records))
    return "Populated test data."
