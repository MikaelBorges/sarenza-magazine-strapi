#!/bin/sh

docker volume create --name strapidb -d local
./install-dev.sh
yarn --cwd strapi/Strapi develop