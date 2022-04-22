#!/bin/sh
set -ea    
rootFolder=$PWD

if [ -d "plugins" ] 
then
    for d in plugins/*/; do
        cd="cd ${d}"
        eval $cd

        if [ -f "./init.sh" ]; then
            echo "$cd is on and ready to go"
            dos2unix ./init.sh && chmod +x ./init.sh && ./init.sh
            eval "cd $rootFolder"
        fi
    done
fi