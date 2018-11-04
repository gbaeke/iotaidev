Create resource group:

az group create --name realtime-rg --location westeurope

Deploy template:

az group deployment create --name realtimedep --resource-group realtime-rg --template-file .\azuredeploy.json --parameters azuredeploy.parameters.json

