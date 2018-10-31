To deploy multi-container ACI, use:

az container create --resource-group rg-iotaidev --file multi.yaml

Additional paramters:
- --dns-name-label iotairt 
- --restart-policy Always

(need to be set in yaml if you use a yaml file)

To export YAML of an existing container:

az container export --resource-group rg-iotaidev --name realtime --file realtime-export.yaml

Logs:

az container logs --resource-group rg-iotaidev --name realtime-app  --container-name realtime-service

Tip: to test, open console of redis container and in redis-cli type PUBLISH mydevice '{"temperature":20}'