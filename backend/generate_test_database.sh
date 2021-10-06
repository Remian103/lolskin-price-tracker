#!/usr/bin/env bash
# Generate an empty database on 12.7 PostgreSQL container, configured by $src_profile.
# And populate the database with some random test data
# If -c|--clone argument is passed, clone the database pointed by $dst_profile to the generated database.
# If -e|--empty arugment is passed, the generated database is kept empty.

src_profile=production
dst_profile=test
config_file=db_config.ini

MODE=GEN_TEST_DATA
while test $# != 0; do
    case "$1" in
        -m|--mode)
            MODE=$(echo $2 | tr [:lower:] [:upper:])
            shift
            shift
            ;;
        *)
            break
            ;;
    esac
done

# https://stackoverflow.com/a/43934154/15909723
read_ini_file() {
    local obj=$1
    local key=$2
    local file=$3
    awk '/^\[.*\]$/{obj=$0}/=/{print obj $0}' $file \
        | grep '^\['$obj'\]'$key' *=' \
        | awk '{sub(/=/," "); print $2}'
}

dst_username=$(read_ini_file $dst_profile username $config_file)
dst_password=$(read_ini_file $dst_profile password $config_file)
dst_host=$(read_ini_file $dst_profile host $config_file)
dst_port=$(read_ini_file $dst_profile port $config_file)
dst_database_name=$(read_ini_file $dst_profile database_name $config_file)


# Remove previously generated container if exists
name=`docker ps -a | grep postgres`
if [ "$name" != "" ]; then
    echo "Running postgres container detected"
    read -n 1 -s -r -p "Press any key to remove current container to proceed:"$'\n'
    echo "Removing previous postgres container..."
    docker stop postgres
    docker rm postgres
fi

echo "Generating an empty PostgreSQL database based on [$dst_profile] in $config_file..."
docker run \
    -e POSTGRES_USER=$dst_username \
    -e POSTGRES_DB=$dst_database_name \
    -e POSTGRES_PASSWORD=$dst_password \
    -p $dst_port:$dst_port \
    --name postgres \
    -d postgres:12.7

# Since the container is initiated on background, the above command is nonblocking
# Thus give the container some time to finish the database creation.
# A simple 'sleep 3' would probably also work on most situations.
# A better way would be to pooling the container status on a shorter interval.
sleep 3

if [ "$MODE" = "CLONE" ]; then
    echo "Cloning [$src_profile] in $config_file to local postgres container..."

    src_username=$(read_ini_file $src_profile username $config_file)
    src_password=$(read_ini_file $src_profile password $config_file)
    src_host=$(read_ini_file $src_profile host $config_file)
    src_port=$(read_ini_file $src_profile port $config_file)
    src_database_name=$(read_ini_file $src_profile database_name $config_file)

    docker exec -i postgres bash -c \
        'cd ~
        echo "*:*:*:*:'$src_password'" > .pgpass
        chmod 0600 ~/.pgpass
        pg_dump -h '$src_host' -p '$src_port' -U '$src_username' -w -f production.sql '$src_database_name'
        psql -U '$dst_username' -d '$dst_database_name' -f production.sql'

elif [ "$MODE" = "GEN_TEST_DATA" ]; then
    echo "Populating the generated database with test data..."
    
    alembic upgrade head
    echo "\n" | update_scripts/update_static.py
    echo "\n" | update_scripts/gen_test_history.py
fi
