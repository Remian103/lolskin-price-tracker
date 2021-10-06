#!/usr/bin/env bash

PORT=8000

while test $# != 0; do
    case "$1" in
        --prod)
            PROD_MODE=true
            shift
            ;;
        --port)
            PORT=$2
            shift
            shift
            ;;
        *)
            break
            ;;
    esac
done

if [ "$PROD_MODE" = "true" ]; then
    OLD_LOG=`ls | grep uvicorn_*.log`
    NEW_LOG=`gawk 'BEGIN{ print strftime("uvicorn_%y%m%dT%H%M%S.log"); }'`
    if [ "$OLD_LOG" = "" ]; then
        echo "Creating '$NEW_LOG'..."
    else
        echo "Renaming '$OLD_LOG' to '$NEW_LOG'..."
        mv $OLD_LOG $NEW_LOG
    fi
    echo "Start Logging..."
    echo "====================================================================================================" >> $NEW_LOG
    nohup poetry run uvicorn app.main:app --reload-dir app --reload --port $PORT |& gawk '{ print strftime("[%Y-%m-%d %H:%M:%S]"), $0; fflush(); }' >> $NEW_LOG
else 
    uvicorn app.main:app --reload-dir app --reload --port $PORT
fi
