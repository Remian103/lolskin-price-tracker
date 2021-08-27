from sqlalchemy.orm import Session

from . import models, schemas


def get_champions(db: Session):
    return db.query(models.Champion).all()


def get_last_price_history(db: Session, skin_id: int):
    return db.query(models.Price_History).filter(models.Price_History.skin_id == skin_id).order_by(models.Price_History.date.desc()).first()


def get_skins_by_champion_id(db: Session, champion_id: int):
    return db.query(models.Skin).filter(models.Skin.champion_id == champion_id).all()


def get_skin_by_id(db: Session, skin_id: int):
    return db.query(models.Skin).filter(models.Skin.id == skin_id).one()
