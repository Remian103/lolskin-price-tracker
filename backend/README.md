# Installation
## Install Poetry
https://python-poetry.org/docs/#installation

## Setup environment
```bash
poetry install
```

## Activate environment
```bash
poetry shell
```
to open a new shell with associated environment,

or
- Linux
    ```bash
    source /path/to/venv//bin/activate
    ```
 - Windows
    ```bash
    source \path\to\venv\Scripts\activate.bat
    ```
to activate the environment in current shell.

## Run
```bash
cd /path/to/backend/
uvicorn app.main:app --reload
```
In WSL
```bash
uvicorn app.main:app --reload --host [wsl_ip]
```

The app will be available on localhost:8000.

Visit
```
localhost:8000/docs
```
for available APIs and their documentation.

## Update static data
```bash
cd /path/to/backend/
python -m app.update_static
```

## Populate dummy price history
```bash
cd /path/to/backend/
python -m app.gen_test_history
```