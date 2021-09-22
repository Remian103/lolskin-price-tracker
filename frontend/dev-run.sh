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
# In container,
# when you run `yarn add ...` command to test another packages,
# then changes of package will be reflected in ./testPackage.
# If you want to save this setting,
# 1. stop the container.
# 2. run `./dev-images.sh update`
#############################################################


# Copy and paste files about package to 'testPackage' folder.
# This ensures that the original package information is preserved.
# If you want to add some other packages, follow the instruction above.
if [ ! -d testPackage ]; then
    mkdir testPackage
fi

if [ ! -d build ]; then
    mkdir build
fi

cp ./package.json ./testPackage/package.json
cp ./yarn.lock ./testPackage/yarn.lock

# Run docker container
docker run --rm -it -p 3000:3000 \
    -v $(pwd)/src:/frontend/src \
    -v $(pwd)/public:/frontend/public \
    -v $(pwd)/build:/frontend/build \
    -v $(pwd)/testPackage/package.json:/frontend/package.json \
    -v $(pwd)/testPackage/yarn.lock:/frontend/yarn.lock \
    -v $(pwd)/tsconfig.json:/frontend/tsconfig.json \
    --name=react \
    --user "$(id -u):$(id -g)" \
    remian103/frontend-dev \
    bash