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
which will open a new shell with associated the environment

or
- Linux
```bash
source {path_to_venv}/bin/activate
```
 - Windows
```bash
source {path_to_venv}\Scripts\activate.bat
```

## Run
```bash
cd some/path/to/backend/
uvicorn app.main:app --reload
```
The app will be available on localhost:8000.

Visit
```
localhost:8000/docs
```
for available APIs and their documentation.

# Database Schema
See this draft.

![database_draft](database_draft.png)