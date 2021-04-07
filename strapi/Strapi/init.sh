#!/bin/sh
set -ea    
rootFolder=$PWD

for d in plugins/*/; do
    cd="cd ${d}"
    eval $cd

    if [ -f "./init.sh" ]; then
        echo "$cd is on and ready to go"
        dos2unix ./init.sh
        chmod +s ./init.sh
        ./init.sh
        eval "cd $rootFolder"
    fi
done