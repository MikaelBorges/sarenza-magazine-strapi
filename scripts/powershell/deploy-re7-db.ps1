# gcloud container clusters get-credentials srz-gke-prd-36d82766 --zone europe-west1-b --project srz-prj-ec4f7b6b
# helm upgrade --recreate-pods -i strapi ./helm/sarenza-digitalexperience-cms-strapi --namespace digitalexperience

gcloud container clusters get-credentials srz-gke-hp-99aad13f --zone europe-west1-b --project srz-prj-a5a67395
kubectl create --namespace digitalexperience-re7 configmap init-database-strapi --from-file=helm/sarenza-digitalexperience-cms-database/init.sql
helm upgrade -i --wait strapi-db ./helm/sarenza-digitalexperience-cms-database/postgresql --namespace digitalexperience-re7
# --recreate-pods