# docker-compose build

# az acr login -n srzlab
# docker-compose push

# gcloud container clusters get-credentials srz-gke-prd-36d82766 --zone europe-west1-b --project srz-prj-ec4f7b6b
# helm upgrade --recreate-pods -i strapi ./helm/sarenza-digitalexperience-cms-strapi --tiller-namespace digitalexperience-tiller --namespace digitalexperience

gcloud container clusters get-credentials srz-gke-hp-99aad13f --zone europe-west1-b --project srz-prj-a5a67395
helm upgrade -i --wait strapi ./helm/sarenza-digitalexperience-cms-strapi --tiller-namespace digitalexperience-uat-tiller --namespace digitalexperience-uat
# --recreate-pods