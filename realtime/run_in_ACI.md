To run in ACI use:

az container create -g rg-iotaidev -n realtime --image gbaeke/iotaidev --ports 80 --ip-address public --environment-variables PORT=80 REDISHOST=host REDISKEY=key

- set REDISHOST variable to host name of Redis Cache; if not provided connection is to 127.0.0.1
- set REDISKEY variable to primary or secondary key
- if you change PORT also update the --ports value

**NOTE:** gbaeke/iotaidev is a public image based on the Dockerfile in this folder