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
./run.sh [port=80]
```

The app will run on $(hostname --all-ip-address):port(=80), which is often the desired behavior.

Visit
```
localhost:80/docs
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

## Logs
Log files are available in `/path/to/backend/logs`

Note that logs are cleared at next run.