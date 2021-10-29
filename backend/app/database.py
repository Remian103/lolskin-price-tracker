import os
from configparser import ConfigParser

from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base


# Try to load 'db_config.ini'.
# Will use local SQlite on any kind of failure(e.g. 'db_config.ini' not exists, not properly written...)
# Note that this does not guarantee that the DB_URL is actually reachable.
try:
    config = ConfigParser()
    config_file = os.path.join(os.path.dirname(__file__), '../db_config.ini')
    config.read(config_file)
    db_config = config[config['active']['profile']]
    DB_URL = f'{db_config["dialect"]}+{db_config["driver"]}://{db_config["username"]}:{db_config["password"]}@{db_config["host"]}:{db_config["port"]}/{db_config["database_name"]}'
    engine = create_engine(DB_URL)
    print(f'[Current DB]: {db_config["prompt_name"]}')
except Exception:
    try:
        print('"db_config.ini" is not found or invalid.')
        print('Reading from environment variable...')
        db_config = os.environ
        DB_URL = f'postgresql+psycopg2://{db_config["POSTGRESQL_USERNAME"]}:{db_config["POSTGRESQL_PASSWORD"]}@{db_config["POSTGRESQL_HOST"]}:{db_config["POSTGRESQL_PORT"]}/{db_config["POSTGRESQL_DB"]}'
        engine = create_engine(DB_URL)
    except:
        DB_URL = f'sqlite:///{os.path.join(os.path.dirname(__file__), "../sqlite3.db")}'
        engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
        print(f'[Current DB]: local SQLite')


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

Base = declarative_base(metadata=MetaData(naming_convention=convention))
