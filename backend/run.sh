#!/bin/bash
if [ -d logs ]; then
    rm -rdf logs
fi
mkdir logs
uvicorn app.main:app --reload-dir app --log-config=log_conf.json --host $(hostname --all-ip-address) --port ${1:-8000}