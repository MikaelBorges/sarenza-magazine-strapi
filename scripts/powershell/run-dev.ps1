docker volume create --name strapidb -d local
./scripts/powershell/install-dev.ps1
yarn --cwd strapi/cmsv4 dev