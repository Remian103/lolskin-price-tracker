#!/bin/bash

if [ $1 == "update" ];
then
    echo "Replace package.json and yarn.lock"
    cp ./testPackage/package.json ./package.json
    cp ./testPackage/yarn.lock ./yarn.lock
fi

# save previous image's id
id=`docker images | grep frontend-dev | awk '{print $3}'`
echo $id

# clear ./testPackage
rm ./testPackage/package.json
rm ./testPackage/yarn.lock

echo "Build docker image  \'frontend-dev\'"
docker build -f Dockerfile.dev -t frontend-dev .

if [ -n ${id} ];
then
    name=`docker images | grep ${id} | awk '{print $1}'`
    if [ ${name} != "frontend-dev" ];
    then
        echo "Delete old image.."
        docker rmi ${id}
    fi
fi
echo "Done"