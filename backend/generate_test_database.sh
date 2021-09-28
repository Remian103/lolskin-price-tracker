#!/bin/bash
# Clone src_profile to dst_profile(which is currently fixed to local container)

read_ini_file() {
    local obj=$1
    local key=$2
    local file=$3
    awk '/^\[.*\]$/{obj=$0}/=/{print obj $0}' $file \
        | grep '^\['$obj'\]'$key' *=' \
        | awk '{sub(/=/," "); print $2}'
}


filename=db_config.ini

src_profile=production
src_username=$(read_ini_file $src_profile username $filename)
src_password=$(read_ini_file $src_profile password $filename)
src_host=$(read_ini_file $src_profile host $filename)
src_port=$(read_ini_file $src_profile port $filename)
src_database_name=$(read_ini_file $src_profile database_name $filename)

dst_profile=test
dst_username=$(read_ini_file $dst_profile username $filename)
dst_password=$(read_ini_file $dst_profile password $filename)
dst_host=$(read_ini_file $dst_profile host $filename)
dst_port=$(read_ini_file $dst_profile port $filename)
dst_database_name=$(read_ini_file $dst_profile database_name $filename)


# Kill previously generated container if exists
name=`docker ps -a | grep postgres`
if [ "$name" != "" ]; then
    echo "Removing previous postgres container..."
    docker kill postgres & docker rm postgres
fi

echo "Generating clean postgres container..."
docker run \
    -e POSTGRES_USER=$dst_username \
    -e POSTGRES_DB=$dst_database_name \
    -e POSTGRES_PASSWORD=$dst_password \
    -p $dst_port:$dst_port \
    --name postgres \
    -d postgres
sleep 1

echo "Cloning remote AWS RDS to local postgres container..."
docker exec -i postgres bash -c \
    'cd ~
    echo "*:*:*:*:'$src_password'" > .pgpass
    chmod 0600 ~/.pgpass
    pg_dump -h '$src_host' -p '$src_port' -U '$src_username' -w -f production.sql '$src_database_name'
    psql -U '$dst_username' -d '$dst_database_name' -f production.sql'
