# docker rmi $(docker images --filter "dangling=true" -q --no-trunc)


# docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=<image_id> -q)
# docker rmi $(docker images -a -q)
# docker rmi -f 166f4ad24848


# docker volume rm -f 0b53c709f7f349967d0a61eb2b58b35405cb40cd2ed041f5fba23a4d0b469f59

foreach ($container in $(docker ps -a -q)){
    docker rm -f $container;
}

foreach ($volume in $(docker volume ls -q)){
    docker volume rm -f $volume;
}

foreach ($image in $(docker images -a -q)) {
    # docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=$image -q)


    foreach($iii in $(docker images --filter since=$image -q)){
        docker rmi -f $(docker inspect --format='{{.Id}}' $iii)
    }    
}




