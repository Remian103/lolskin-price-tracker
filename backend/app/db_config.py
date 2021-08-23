import os
from configparser import ConfigParser


# Try to load 'db_config.ini'.
# Will use local SQlite on any kind of failure(e.g. 'db_config.ini' not exists, not properly written...)
# Note that this does not guarantee that the DB_URL is actually reachable.
try:
    config = ConfigParser()
    config_file = os.path.join(os.path.dirname(__file__), '../db_config.ini')
    config.read(config_file)
    db_config = config[config['active']['profile']]
    DB_URL = f'{db_config["dialect"]}+{db_config["driver"]}://{db_config["username"]}:{db_config["password"]}@{db_config["host"]}:{db_config["port"]}/{db_config["database_name"]}'
    print(f'Using {db_config["prompt_name"]}...')
except Exception:
    DB_URL = 'sqlite:///./sqlite3.db'
    print(f'Using local SQLite...')
