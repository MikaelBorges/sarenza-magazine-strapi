#!/bin/sh
set -ea

# npm install -g strapi
npm install

strapi install graphql
strapi install documentation

strapi build

exec "$@"