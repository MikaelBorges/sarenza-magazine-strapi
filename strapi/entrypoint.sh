#!/bin/sh
set -ea

# npm install -g strapi
npm install
strapi build

exec "$@"