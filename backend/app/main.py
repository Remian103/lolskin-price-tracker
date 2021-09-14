from typing import List, Optional

from fastapi import Depends, FastAPI, Security, HTTPException, Body
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests

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
    return schemas.SkinFull(**db_skin.__dict__, last_price_history=price_history)


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


@app.get('/api/skins/{skin_id}', response_model=schemas.SkinFull)
def get_skin(skin_id: int, db: Session = Depends(get_db)):
    db_skin = crud.get_skin_by_id(db, skin_id)

    # Trigger relation query(otherwise not executed because of lazy loading)
    db_skin.price_history
    
    return get_skin_with_last_price_history(db, db_skin)


CLIENT_ID = '183733547550-9ib07k4clf315q8m2vi9ipcujscf7qja.apps.googleusercontent.com'
oauth2_scheme = HTTPBearer(auto_error=False)

def get_current_user(db: Session = Depends(get_db), token: HTTPBearer = Security(oauth2_scheme)):
    try:
        idinfo = id_token.verify_oauth2_token(token.credentials, requests.Request(), CLIENT_ID)

        try:
            # Registered user
            return crud.get_user_by_email_address(db, idinfo['email'])
        except Exception:
            # Register if new
            return crud.create_user(db, schemas.UserCreate(email_address=idinfo['email']))
    except Exception:
        # Token is either invalid or does not exist
        raise(HTTPException(401, detail='Invalid JWT'))


def get_current_user_optional(db: Session = Depends(get_db), token: Optional[HTTPBearer] = Security(oauth2_scheme)):
    if token is None:
        return None
    return get_current_user(db, token)


@app.post('/api/skins/{skin_id}/comments', response_model=schemas.Comment)
def post_comment(skin_id: int, content: str = Body(...), user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = schemas.CommentCreate(skin_id=skin_id, author_id=user.id, content=content)
    return crud.create_comment(db, db_comment)


@app.get('/api/comments/{comment_id}', response_model=schemas.Comment)
def get_comment(comment_id: int, user: schemas.User = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).one()


@app.get('/api/skins/{skin_id}/comments', response_model=schemas.CommentsList)
def get_comments_list(skin_id: int, skip: int = 0, limit: int = 10, order_by: str = 'desc_likes', user: schemas.User = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    # Probably need caching
    db_comments = crud.get_comments_by_skin_id(db, skin_id, order_by)
    ret = schemas.CommentsList(
        skin_id=skin_id,
        num_comments=len(db_comments),
        skip=skip,
        limit=limit,
        order_by=order_by,
        comments=[]
    )
    if skip < len(db_comments):
        ret.comments = db_comments[skip:limit]
    return ret


@app.put('/api/comments/{comment_id}', response_model=schemas.Comment)
def modify_comment(comment_id: int, content: str = Body(...), user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if user.id != db_comment.id:
        raise(HTTPException(401, detail='Unauthorized user'))
    return crud.modify_comment_by_id(db, comment_id, content)


@app.delete('/api/comment/{comment_id}')
def delete_comment(comment_id: int, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if user.id != db_comment.id:
        raise(HTTPException(401, detail='Unauthorized user'))
    crud.delete_comment_by_id(db, comment_id)
