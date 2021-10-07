#!/bin/bash

#############################################################
# Script for auto running docker container (development env)
#
# arguments
# - (none) : run docker container with port 3000
# - (port number) : run docker container with port (port number)
#
#
# It makes the container ready to run the react app
# Run `yarn start`, then react app activated in development mode
# and automatically reload if you make changes to the code.
#
#############################################################


if [ ! -d build ]; then
    mkdir build
fi

# Run docker container
docker run --rm -it -p ${1:-3000}:3000 \
    -v $(pwd)/src:/frontend/src \
    -v $(pwd)/public:/frontend/public \
    -v $(pwd)/build:/frontend/build \
    -v $(pwd)/package.json:/frontend/package.json \
    -v $(pwd)/yarn.lock:/frontend/yarn.lock \
    -v $(pwd)/tsconfig.json:/frontend/tsconfig.json \
    --name=react \
    --user "$(id -u):$(id -g)" \
    remian103/frontend-dev \
    bash