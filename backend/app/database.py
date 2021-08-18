from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Use AWS RDS Instance if account profile exist.
# Comment out the 'and False'(delete ': #') to force usage of sqlite for local test.
if Path('db_account').exists(): # and False:
    print('Using AWS RDS')
    with open('db_account', 'r') as f:
        DB_USERNAME = f.readline().strip()
        DB_PASSWORD = f.readline().strip()
        DB_ENDPOINT = f.readline().strip()
        DB_NAME = f.readline().strip()
        SQLALCHEMY_DATABASE_URL = f'postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_ENDPOINT}/{DB_NAME}'
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    print('Using local sqlite')
    SQLALCHEMY_DATABASE_URL = "sqlite:///./sqlite3.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )





SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
