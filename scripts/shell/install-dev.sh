#!/bin/sh

docker-compose -f ..\..\docker-compose.dev.yml kill
docker-compose -f ..\..\docker-compose.dev.yml rm -f
docker-compose -f ..\..\docker-compose.dev.yml pull
docker-compose -f ..\..\docker-compose.dev.yml build #--force-rm --no-cache 
docker-compose -f ..\..\docker-compose.dev.yml up -d #--force-recreate