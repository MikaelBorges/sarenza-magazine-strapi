docker-compose kill
docker-compose rm -f
docker-compose pull
docker-compose build #--force-rm --no-cache 
docker-compose up -d #--force-recreate