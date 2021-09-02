from typing import List

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal


app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_skin_with_last_price_history(db: Session, db_skin: models.Skin):
    db_last_price_history = crud.get_last_price_history(db, db_skin.id)
    if db_last_price_history is None:
        price_history = None
    else:
        price_history = schemas.Price_History(**db_last_price_history.__dict__)
    return schemas.Skin_Full(**db_skin.__dict__, last_price_history=price_history)


@app.get('/api/champions', response_model=List[schemas.Champion])
def get_champions(db: Session = Depends(get_db)):
    return crud.get_champions(db)


@app.get('/api/champions/{champion_id}/skins', response_model=List[schemas.Skin])
def get_champion_skins(champion_id: int, db: Session = Depends(get_db)):
    db_skins = crud.get_skins_by_champion_id(db, champion_id)
    
    return [get_skin_with_last_price_history(db, db_skin) for db_skin in db_skins]


@app.get('/api/recommendations', response_model=List[schemas.Skin])
def get_recommendations(db: Session = Depends(get_db)):
    # Some dummy recommendation for testing
    skin_ids = [11001, 12001, 13001, 14001]
    db_skins = [crud.get_skin_by_id(db, skin_id) for skin_id in skin_ids]
    return [get_skin_with_last_price_history(db, db_skin) for db_skin in db_skins]


@app.get('/api/skins/{skin_id}', response_model=schemas.Skin_Full)
def get_skin(skin_id: int, db: Session = Depends(get_db)):
    db_skin = crud.get_skin_by_id(db, skin_id)
    # Trigger relation query(otherwise not executed because of lazy loading)
    db_skin.price_history
    
    return get_skin_with_last_price_history(db, db_skin)


def validate_user(db: Session = Depends(get_db)):
    # If token is invalid
    # 401 Unauthorized

    # If new user
    # Create user
    
    # ----- Test Code ----- # 
    db.query(models.User).delete()
    test_user = schemas.UserCreate(email_address='user@test.com', username='test_user')
    return crud.create_user(db, test_user)
    # ----- Test Code ----- #

    # return user
    ...

@app.post('/api/skins/{skin_id}/comments', response_model=schemas.Comment)
def post_comment(skin_id: int, user: schemas.User = Depends(validate_user), db: Session = Depends(get_db)):
    test_comment = schemas.CommentCreate(skin_id=skin_id, author_username=user.username, content='test message')
    return crud.create_comment(db, test_comment)


@app.get('/api/comments/{comment_id}', response_model=schemas.Comment)
def get_comment(comment_id: int, db: Session = Depends(get_db)):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).one()
