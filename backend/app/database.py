from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from .db_config import DB_URL


engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
