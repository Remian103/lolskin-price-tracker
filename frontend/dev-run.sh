#!/bin/bash

#############################################################
# Script for auto running docker container (development env) 
#
# It makes the container execute react server
# and reflect codes in ./src and ./public in real time.
#
# In container, (by 'docker exec -it react bash')
# when you run 'yarn add ...' command to add another packages,
# then changes will be reflected in ./testPackage
# If you want to save this enviroment,
# 1. replace ./package.json and ./yarn.lock to files in ./testPackage
# 2. run './dev-images.sh'.
#############################################################

# copy and paste files about package to 'testPackage' folder
if [ ! -d testPackage ]; then
    mkdir testPackage
fi
cp $(pwd)/package.json testPackage/package.json
cp $(pwd)/yarn.lock testPackage/yarn.lock

# run docker container
docker run --rm -it -p 3000:3000 \
    -v $(pwd)/src:/frontend/src \
    -v $(pwd)/public:/frontend/public \
    -v $(pwd)/testPackage/package.json:/frontend/package.json \
    -v $(pwd)/testPackage/yarn.lock:/frontend/yarn.lock \
    --name=react \
    frontend-dev