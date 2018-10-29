const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
    const client = new CosmosClient({ endpoint: process.env.COSMOSDB_ENDPOINT, 
        auth: { masterKey: process.env.COSMOSDB_KEY },
        connectionPolicy: { DisableSSLVerification: true }
    });

    sender = context.bindingData.sender;
    context.log("Sender is %s", sender);

    databaseId = process.env.COSMOSDB_DATABASE;
    containerId = process.env.COSMOSDB_COLLECTION;

    const querySpec = {
        query: "SELECT c.sender, c.text, c.score, c.sentiment FROM c WHERE c.sender = @sender",
        parameters: [
            {
                name: "@sender",
                value: sender
            }
        ]
    };

    const { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
    context.res = {
        status: 200,
        body: results
    };
}