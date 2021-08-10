from sqlalchemy.orm import Session

from . import models, schemas


def get_champions(db: Session):
    return db.query(models.Champion).all()


def get_skin(db: Session, skin_id: int):
    return db.query(models.Skin).filter(models.Skin.id == skin_id).first()


def get_skins_by_champion_name(db: Session, champion_name: str):
    return db.query(models.Skin).filter(models.Skin.champion_name == champion_name).all()


# def get_users(db: Session, skip: int = 0, limit: int = 100):
#    return db.query(models.User).offset(skip).limit(limit).all()


def create_skin(db: Session, id: int, name: str, champion_id: int, champion_name: str):
    db_skin = models.Skin(id=id, name=name, champion_id=champion_id, champion_name=champion_name)
    db.add(db_skin)
    db.commit()
    db.refresh(db_skin)
    return db_skin


def get_sale_records(db: Session, skin_id: int):
    return db.query(models.Sale_Record).filter(models.Sale_Record.skin_id == skin_id).all()


def create_sale_record(db: Session, sale_record: schemas.Sale_Record):
    db_sale_record = models.Sale_Record(**sale_record.dict())
    db.add(db_sale_record)
    db.commit()
    db.refresh(db_sale_record)
    return db_sale_record
