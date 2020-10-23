helm upgrade -i strapi-dev ./helm/sarenza-digitalexperience-cms-strapi --tiller-namespace digitalexperience-dev-tiller --namespace digitalexperience-dev
helm upgrade -i strapi-db-dev ./helm/sarenza-digitalexperience-cms-database/postgresql --tiller-namespace digitalexperience-dev-tiller --namespace digitalexperience-dev


# PostgreSql

```
helm repo add bitnami https://charts.bitnami.com/bitnami
```