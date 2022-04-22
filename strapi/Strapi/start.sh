#!/bin/sh
 
ls -a node_modules

echo "starting strapi in ${NODE_ENV} mode"

if [ "${NODE_ENV}" = "production" ]; then
    /srv/.npm-global/bin/strapi start
else
    /srv/.npm-global/bin/strapi develop
fi