// load environment variables from .env file
require('dotenv').config();

const CosmosClient = require('@azure/cosmos').CosmosClient;

const client = new CosmosClient({ endpoint: process.env.COSMOSDB_ENDPOINT, 
    auth: { masterKey: process.env.COSMOSDB_KEY } });

const databaseId = process.env.COSMOSDB_DATABASE;
const containerId = process.env.COSMOSDB_COLLECTION

// let's read the database
async function readDatabase() {
    const { body: databaseDefinition } = await client.database(databaseId).read();
    console.log(`Reading database: ${databaseDefinition.id}\n`);
}

// let's read the container
async function readContainer() {
    const { body: containerDefinition } = await client.database(databaseId).container(containerId).read();
    console.log(`Reading container: ${containerDefinition.id}\n`);
}

async function queryTweets() {
    console.log(`Querying container: ${containerId}`);

    // query to return all tweets by Geert Baeke
    const querySpec = {
        query: "SELECT VALUE c.text FROM c WHERE c.sender = @sender",
        parameters: [
            {
                name: "@sender",
                value: "Geert Baeke"
            }
        ]
    };

    const { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
    for (var queryResult of results) {
        let resultString = JSON.stringify(queryResult);
        console.log(`\t${resultString}\n`);
    }
};

readDatabase()
    .then(() => readContainer())
    .then(() => queryTweets());