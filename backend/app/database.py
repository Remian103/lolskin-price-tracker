from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from .db_config import POSTGRESQL_URL, SQLITE_URL


# Use AWS RDS Instance if account profile exist.
# Comment out the 'and False'(delete ': #') to force usage of sqlite for local test.
if POSTGRESQL_URL is not None:
    print('Using AWS RDS')
    engine = create_engine(POSTGRESQL_URL)
else:
    print('Using local sqlite')
    engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
