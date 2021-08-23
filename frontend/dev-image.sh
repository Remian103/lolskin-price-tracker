#!/bin/bash

#############################################################
# Script for auto building docker image (development env)
#
# arguments
# - (none) : build image
# - update : build image from './testPackage'
#############################################################

# argument
if [ ${1:-no-update} == "update" ];
then
    echo "Replace package.json and yarn.lock"
    cp ./testPackage/package.json ./package.json
    cp ./testPackage/yarn.lock ./yarn.lock
    rm ./testPackage/package.json
    rm ./testPackage/yarn.lock
fi

# save previous image's id
id=`docker images | grep frontend-dev | awk '{print $3}'`
echo $id

# Build image
echo "Build docker image  'remian103/frontend-dev'"
docker build -f Dockerfile.dev -t remian103/frontend-dev \
    --build-arg USER_ID=$(id -u) \
    --build-arg GROUP_ID=$(id -g) .

# Delete previous image
if [ -n ${id} ];
then
    name=`docker images | grep ${id} | awk '{print $2}'`
    if [ ${name} != "latest" ];
    then
        echo "Delete old image.."
        docker rmi ${id}
    fi
fi
echo "Done"