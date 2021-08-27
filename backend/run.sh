#!/bin/bash
if [ -d logs ]; then
    rm -rdf logs
fi
mkdir logs
poetry run uvicorn app.main:app --reload-dir app --reload --log-config=log_conf.json --port ${1:-8000}