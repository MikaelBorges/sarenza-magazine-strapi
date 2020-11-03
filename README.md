## Meta-informations

* Version de `helm` supportée
    * 2.14.1

## `docker`

### Pousser ses images dans le dépôt `docker` d'Azure

```powershell
az login
az acr login -n srzlab

docker-compose build
docker-compose push

```
## `helm`

## Mettre à jour l'environnement des environnements

### Variables d'environnement

#### dev
---
| clé              | value                           |
|------------------|---------------------------------|
| namespace        | `digitalexperience-dev`         |
| tiller-namespace | `digitalexperience-dev-tiller`  |
| strapi-db name   | `strapi-db-dev`                 |
| strapi name      | `strapi-dev`                    |
| project          | `srz-prj-a5a67395`              |
| credentials      | `srz-gke-hp-99aad13f`           |
| strapi admin url | http://strapi.dev.sarenza.corp/ |

#### recette 
---
#### prod
---
| clé              | value                           |
|------------------|---------------------------------|
| namespace        | `digitalexperience`             |
| tiller-namespace | `digitalexperience-tiller`      |
| strapi-db name   | `strapi-db`                     |
| strapi name      | `strapi`                        |
| project          | `srz-prj-ec4f7b6b`              |
| credentials      | `srz-gke-prd-36d82766`          |
| strapi admin url | http://strapi.prd.sarenza.corp/ |
---

## Modifications de conf


```yaml
#development 
env:
    - name: DATABASE_HOST
        value: strapi-db-dev-postgresql
    - name: NODE_ENV
        value: development
```

```yaml
#production 
env:
    - name: DATABASE_HOST
        value: strapi-db-postgresql
    - name: NODE_ENV
        value: production
```


### Obtenir les credentials sur le projet GCP

```
$ gcloud container clusters get-credentials [credentials] --zone europe-west1-b --project [project]
```


### Commandes à exécuter


```sh
# configmap pour l'init sql
kubectl create --namespace [namespace] configmap init-database-strapi --from-file=helm/sarenza-digitalexperience-cms-database/init.sql

# Create/Update l'app [strapi-db-dev]
$ helm upgrade -i [strapi-db name] ./helm/sarenza-digitalexperience-cms-database/postgresql --tiller-namespace [tiller-namespace] --namespace [namespace]

# Create/Update l'app [strapi-dev]
$ helm upgrade -i [strapi name] ./helm/sarenza-digitalexperience-cms-strapi --tiller-namespace [tiller-namespace] --namespace [namespace]
```

### Mapper le `kubernetes` sur son local pour accéder à la BDD par exemple :

```
kubectl port-forward svc/strapi-db-dev-postgresql-headless 5432:5432 -n digitalexperience-dev
```

---
---

# helm

## Ajouter un dépôt `helm`

1. *bitnami*
```sh
$ helm repo add bitnami https://charts.bitnami.com/bitnami     
```

## Initialiser un `chart` pour  `postgresql`

/!\ nécessite d'avoir installé le dépôt *bitnami*.

```sh
$ helm fetch --untar bitami/postgresql
$ helm install my-release bitnami/postgresql
```

## Initialiser un `chart` selon le template par défaut

1. création d'un folder
```sh
$ helm create sarenza-digitalexperience-cms-strapi
```

2. Adaptation des fichiers

Supprimer les lignes concernant `ingress` dans : 
* deployment.yaml
* NOTES.txt
* values.yaml

### Initialiser localement `helm`

1. Installer `kubernetes-helm`
```ps
/> choco install kubernetes-helm --version 2.14.1 # Version non buggée pour nos charts
```

```sh
$ helm init --client-only
```

## Connaître son cluster actuel

```sh
$ kubectl config current-context
```