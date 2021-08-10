#!/bin/bash
docker run --rm -it -p 3000:3000 -v $(pwd)/src:/frontend/src -v $(pwd)/public:/frontend/public frontend-dev