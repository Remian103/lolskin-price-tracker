#!/bin/bash

if [ $1 == "cp" ]
then
    echo "Replace package.json and yarn.lock"
    cp ./testPackage/package.json ./package.json
    cp ./testPackage/yarn.lock ./yarn.lock
fi

# clear ./testPackage
rm ./testPackage/package.json
rm ./testPackage/yarn.lock

echo "Build docker image  \'frontend-dev\'"
docker build -f Dockerfile.dev -t frontend-dev .