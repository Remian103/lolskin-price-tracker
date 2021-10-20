from typing import List, Optional

from fastapi import Depends, FastAPI, Security, HTTPException, Body
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests

from . import crud, models, schemas
from .database import SessionLocal


app = FastAPI()

origins = [
    "https://leaguedb-test.netlify.app",
    "https://leaguedb.info",
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        price_history = schemas.PriceHistory(**db_last_price_history.__dict__)
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


def get_comment_with_user_specific_data(db_comment: models.Comment, db_user: models.User):
    return schemas.Comment(
        **db_comment.__dict__,
        current_user_auth=schemas.UserDataOnComment(
            is_modifiable=db_comment.author == db_user,
            is_liked=db_user in db_comment.users_liked,
            is_disliked=db_user in db_comment.users_disliked
        )
    )


@app.post('/api/skins/{skin_id}/comments', response_model=schemas.Comment)
def post_comment(skin_id: int, comment_data: schemas.CommentPost, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.create_comment(db, schemas.CommentCreate(skin_id=skin_id, author_id=db_user.id, content=comment_data.content))
    return get_comment_with_user_specific_data(db_comment, db_user)


@app.get('/api/comments/{comment_id}', response_model=schemas.Comment)
def get_comment(comment_id: int, db_user: models.User = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if db_user is None:
        return db_comment
    else:
        return get_comment_with_user_specific_data(db_comment, db_user)


@app.get('/api/skins/{skin_id}/comments', response_model=schemas.CommentsList)
def get_comments_list(skin_id: int, skip: int = 0, limit: int = 10, order_by: str = 'desc_likes', db_user: models.User = Depends(get_current_user_optional), db: Session = Depends(get_db)):
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
        if db_user is None:
            ret.comments = db_comments[skip:limit]
        else:
            for db_comment in db_comments[skip:limit]:
                ret.comments.append(get_comment_with_user_specific_data(db_comment, db_user))
    return ret


@app.put('/api/comments/{comment_id}', response_model=schemas.Comment)
def modify_comment(comment_id: int, comment_data: schemas.CommentPost, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if db_comment.author != db_user:
        raise(HTTPException(401, detail='Unauthorized user'))
    return get_comment_with_user_specific_data(crud.modify_comment_by_id(db, comment_id, comment_data.content), db_user)


@app.delete('/api/comments/{comment_id}')
def delete_comment(comment_id: int, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if db_comment.author != db_user:
        raise(HTTPException(401, detail='Unauthorized user'))
    crud.delete_comment_by_id(db, comment_id)



# -------------------- Like/Dislike --------------------

@app.post('/api/comments/{comment_id}/likes', response_model=int)
def like_comment(comment_id: int, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    db_comment.users_liked.append(db_user)
    db.commit()
    db_comment.likes = len(db_comment.users_liked)
    db.commit()
    return db_comment.likes


@app.delete('/api/comments/{comment_id}/likes', response_model=int)
def like_comment(comment_id: int, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if db_user in db_comment.users_liked:
        db_comment.users_liked.remove(db_user)
        db_comment.likes = len(db_comment.users_liked)
        db.commit()
    return db_comment.likes


@app.post('/api/comments/{comment_id}/dislikes', response_model=int)
def dislike_comment(comment_id: int, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    db_comment.users_disliked.append(db_user)
    db.commit()
    db_comment.dislikes = len(db_comment.users_disliked)
    db.commit()
    return db_comment.dislikes


@app.delete('/api/comments/{comment_id}/dislikes', response_model=int)
def dislike_comment(comment_id: int, db_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, comment_id)
    if db_user in db_comment.users_disliked:
        db_comment.users_disliked.remove(db_user)
        db_comment.dislikes = len(db_comment.users_disliked)
        db.commit()
    return db_comment.dislikes
