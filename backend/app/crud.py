from datetime import datetime

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


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email_address(db: Session, email_address: str):
    return db.query(models.User).filter(models.User.email_address == email_address).one()


def create_comment(db: Session, comment: schemas.CommentCreate):
    db_skin = get_skin_by_id(db, comment.skin_id)
    db_comment = models.Comment(**comment.dict(), skin=db_skin)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


def get_comment_by_id(db: Session, comment_id: int):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).one()


def get_comments_by_skin_id(db: Session, skin_id: int, order_by: str):
    # Probably need caching
    if order_by == 'desc_likes':
        return db.query(models.Comment).filter(models.Comment.skin_id == skin_id).order_by(models.Comment.likes.desc()).all()

    # For undefined 'order_by'
    return db.query(models.Comment).filter(models.Comment.skin_id == skin_id).order_by(models.Comment.likes.desc()).all()


def modify_comment_by_id(db: Session, comment_id: int, content: str):
    db.query(models.Comment).filter(models.Comment.id == comment_id).update({models.Comment.content: content, models.Comment.last_modified: datetime.today()}, synchronize_session=False)
    db.commit()
    return get_comment_by_id(db, comment_id)


def delete_comment_by_id(db: Session, comment_id: int):
    db.query(models.Comment).filter(models.Comment.id == comment_id).delete()
    db.commit()
