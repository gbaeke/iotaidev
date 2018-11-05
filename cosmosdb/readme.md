Cosmos DB samples

Code requires a .env with this content:

COSMOSDB_ENDPOINT=  
COSMOSDB_KEY=  
#COSMOSDB_ENDPOINT=https://localhost:8081  
#COSMOSDB_KEY=  
COSMOSDB_DATABASE=  
COSMOSDB_COLLECTION=  

**Sample 1: index.js**

Creates a database, reads the database, creates a container, reads the container, create documents, query documents

Note that the documents created are tweets that have a sentiment score. The sample tweets are in tweets.js.

**Sample 2: cosmosdb-pol.js**

Uses a connectionPolicy object in CosmosClient; part of that policy is the PreferredLocations array

Does some logging as well
