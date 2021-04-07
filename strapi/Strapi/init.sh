#!/bin/sh
set -ea    
rootFolder=$PWD

for d in plugins/*/; do
    cd="cd ${d}"
    eval $cd

    if [ -f "./init.sh" ]; then
        echo "$cd is on and ready to go"
        sudo dos2unix ./init.sh
        sudo chmod +s ./init.sh
        ./init.sh
        eval "cd $rootFolder"
    fi
done