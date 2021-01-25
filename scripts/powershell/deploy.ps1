param (
    [Parameter(Mandatory=$false)]
    [switch]$Vbs = $false,
    [Parameter(Mandatory=$false)]
    [switch]$Force = $false
)

function Show-Menu
{
    param (
        [string]$Title = 'Select your environment'
    )
    Clear-Host
    Write-Host "================ $Title ================"
    
    Write-Host "1: Integration"
    Write-Host "2: Recette (re7)"
    Write-Host "3: UAT"
    Write-Host "4: Production"
    Write-Host "Q: Press 'Q' to quit."
}


Show-Menu -Title "Select your environment"

$envSelection=Read-Host "Please make a selection"
$env=''
$project='srz-prj-a5a67395'
$subscription='srz-gke-hp-99aad13f'
$replicaCount=2
$rebuildContainer=$true

switch ($envSelection)
 {
       '1' {
         $env='integration'
     } '2' {
         $env='re7'
     } '3' {
         $env='uat'
     } '4' {
         $env=''
         $project='srz-prj-ec4f7b6b'
         $subscription='srz-gke-prd-36d82766'
         $replicaCount=4
         $rebuildContainer=$false
         $tiller="digitalexperience-tiller"
         $ns="digitalexperience"
     } 'q' {
         return
     }
 }

$version=Read-Host "Please enter a target version"
$Env:VERSION = $version

$tiller="digitalexperience-$env-tiller"
$ns="digitalexperience-$env"

if($Vbs -eq $true)
{
    Write-Host "Version - $version"
    Write-Host "Project - $project"
    Write-Host "Subscription - $subscription"
    Write-Host "Replica count - $replicaCount"
    Write-Host "Environment - $env"
}

$forceDeployParameter = ''
# --recreate-pods to force update pods
if($Force -eq $true)
{
    Write-Host "Forced to re-create pods !"
    $forceDeployParameter = '--recreate-pods'
}

if($rebuildContainer -eq $true)
{
    docker-compose build $forceBuildParameter
    az acr login -n srzlab
    docker-compose push
    gcloud container clusters get-credentials $subscription --zone europe-west1-b --project $project
}

helm upgrade -i $forceDeployParameter --set replicaCount=$replicaCount --set image.tag=$version --wait  strapi ./helm/sarenza-digitalexperience-cms-strapi --tiller-namespace $tiller --namespace $ns