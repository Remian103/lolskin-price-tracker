#!/bin/bash
rm ./logs/*.log
uvicorn app.main:app --reload-dir app --log-config=log_conf.json --host $(hostname --all-ip-address) --port ${1:-8000}