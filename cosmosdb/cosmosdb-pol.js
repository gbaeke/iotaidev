"use strict";

// load environment variables from .env file
require('dotenv').config();
var process = require('process');


const CosmosClient = require('@azure/cosmos').CosmosClient;

// disable SSL verification when you use the emulator
const client = new CosmosClient({ endpoint: process.env.COSMOSDB_ENDPOINT, 
    auth: { masterKey: process.env.COSMOSDB_KEY },
    connectionPolicy: { 
        DisableSSLVerification: false,
        EnableEndpointDiscovery: true,
        PreferredLocations: [
            "Korea South"
        ]}
});

// print clientContext
console.log(client.clientContext);

const databaseId = process.env.COSMOSDB_DATABASE;
const containerId = process.env.COSMOSDB_COLLECTION;

async function readDatabase() {
    // ES6 destructuring to take out body from the JSON and call it databaseDefinition
    const { body: databaseDefinition } = await client.database(databaseId).read();
    console.log(`Database: ${JSON.stringify(databaseDefinition, null, 2)}\n`);
}

// query tweets by Geert Baeke
async function queryTweets() {
    console.log(`Querying container: ${containerId}`);

    const querySpec = {
        query: "SELECT VALUE c.text FROM c WHERE c.sender = @sender",
        parameters: [
            {
                name: "@sender",
                value: "Geert Baeke"
            }
        ]
    };

    const res = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
    // of is ES 6 syntax for iteration
    for (var queryResult of res.result) {
        let resultString = JSON.stringify(queryResult);
        console.log(`\t${resultString}\n`);
    }
    return res;
}

readDatabase()
    .then(() => queryTweets() )
    .then((res) => {
        console.log(`Query result:\n${JSON.stringify(res, null, 2)}`);
        process.exit(0);
    })
    .catch((err) => console.log(err));