from typing import List

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

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


@app.get('/api/champions', response_model=List[schemas.Champion])
def get_champions(db: Session = Depends(get_db)):
    return crud.get_champions(db)


@app.get('/api/champions/{champion_id}/skins', response_model=List[schemas.Skin])
def get_champion_skins(champion_id: int, db: Session = Depends(get_db)):
    return crud.get_skins_by_champion_id(db, champion_id)


@app.get('/api/recommendations', response_model=List[schemas.Skin])
def get_recommendations(db: Session = Depends(get_db)):
    # Some dummy recommendation for testing
    ret = [
        crud.get_skin_by_id(db, 11001),
        crud.get_skin_by_id(db, 12001),
        crud.get_skin_by_id(db, 13001),
        crud.get_skin_by_id(db, 14001)
    ]
    return ret


@app.get('/api/skins/{skin_id}', response_model=schemas.Skin_Full)
def get_skin(skin_id: int, db: Session = Depends(get_db)):
    return crud.get_skin_by_id(db, skin_id)
