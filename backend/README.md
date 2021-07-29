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
cd some/path/to/backend/lolskin_price_tracker
uvicorn main:app --reload
```
The app will be available on localhost:8000.

Visit
```
localhost:8000/docs
```
for available APIs and their documentation.

# Database Schema
See this draft.

![draft](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d6592987-144f-4810-a740-ba0a083b4584/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210729%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210729T105012Z&X-Amz-Expires=86400&X-Amz-Signature=0af273390a2979a131bbffc30a48ee32849028a9610640407075b5024b0b3dbf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)