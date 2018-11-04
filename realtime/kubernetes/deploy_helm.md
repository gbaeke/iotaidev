Deploy the helm chart from the kubernetes/realtime folder

Use the following command:

helm install -n realtime-app --namespace realtime --set env.rediskey="your redis key" --values values.yaml .

To check the installed charts:

helm ls

To delete a chart:

helm delete {name} --purge