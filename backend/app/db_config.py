from pathlib import Path


SQLITE_URL = "sqlite:///./sqlite3.db"

if Path('db_account').exists(): # and False:
    with open('db_account', 'r') as f:
        DB_USERNAME = f.readline().strip()
        DB_PASSWORD = f.readline().strip()
        DB_ENDPOINT = f.readline().strip()
        DB_NAME = f.readline().strip()
        POSTGRESQL_URL = f'postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_ENDPOINT}/{DB_NAME}'
else:
    POSTGRESQL_URL = None