from sqlalchemy.orm import Session

from . import models


def get_champions(db: Session):
    return db.query(models.Champion).all()


def get_skins_by_champion_id(db: Session, champion_id: int):
    return db.query(models.Skin).filter(models.Skin.champion_id == champion_id).all()


def get_skin_by_id(db: Session, skin_id: int):
    return db.query(models.Skin).filter(models.Skin.id == skin_id).one()


def get_skins_by_champion_name(db: Session, champion_name: str):
    return db.query(models.Skin).filter(models.Skin.champion_name == champion_name).all()
