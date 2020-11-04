docker volume create --name strapidb -d local
./install-dev.ps1
yarn --cwd strapi/Strapi develop