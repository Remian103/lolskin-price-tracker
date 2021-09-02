# Installation
## Install Poetry
https://python-poetry.org/docs/#installation

## Clone repository
```bash
$ git clone https://github.com/Remian103/lolskin-price-tracker.git
```

## Setup environment
```bash
$ cd /path/to/backend/
$ poetry install
```

<br/>
<br/>


# Run
## With `run.sh`
```bash
$ cd /path/to/backend/
$ ./run.sh [--port port-num] [--prod]
```
The app will run on localhost.

`--prod` assumes virtural environment off. It will start the app with nohup in the background logging to 'uvicorn_[START_TIME].log'

Without `--prod`, manual virtual environment activation is required.

Visit
```
localhost:8000/docs
```
for available APIs and their documentation.

<br/>
<br/>


# Activate environment
You can also activate the environment to do some custom call upon the app for testing purpose.

## Activate the environment in a new shell
```bash
$ poetry shell
```

## Activate the environment in current shell
- Linux
    ```bash
    $ source /path/to/venv/bin/activate
    or simply
    $ source `poetry env info --path`/bin/activate
    ```
 - Windows
    ```bash
    > source \path\to\venv\Scripts\activate.bat
    ```
<br/>
<br/>


# Update static data
```bash
$ cd /path/to/update_scripts
$ poetry run python update_static.py
```
<br/>
<br/>


# Migrate database
## Configure database
Fill the values in `db_config.ini.sample` and rename it to `db_config.ini`

## Run migartions
In `backend` directory
```bash
$ cd /path/to/backend
```
Check current database revision
```bash
$ poetry run alembic current
```
Upgrade database to latest revision
```bash
$ poetry run alembic upgrade head
```
<br/>
<br/>
