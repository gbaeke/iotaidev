// load environment variables from .env file
require('dotenv').config();

// load sample tweets
const tweets = require('./tweets');

const CosmosClient = require('@azure/cosmos').CosmosClient;

// disable SSL verification when you use the emulator
const client = new CosmosClient({ endpoint: process.env.COSMOSDB_ENDPOINT, 
    auth: { masterKey: process.env.COSMOSDB_KEY },
    connectionPolicy: { DisableSSLVerification: true }
});

const databaseId = process.env.COSMOSDB_DATABASE;
const containerId = process.env.COSMOSDB_COLLECTION;

// createDatabase - not used
async function createDatabase() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    console.log(`Created database: ${database.id}\n`);
}

// createContainer - not used
async function createContainer() {
    const { container } = await client.database(databaseId).containers.createIfNotExists({ id: containerId });
    console.log(`Created container: ${container.id}\n`);
}

// createTweets in container
async function createTweets() {
    // do not use a traditional forEach here
    for ( var tweet of tweets ) {
        // create the tweet
        const { item } = await client.database(databaseId).container(containerId).items.create(tweet);
        console.log(`Created item with id: ${item.id}\n`);             
    
    }  
        
}

// let's read the database
// async function with returns AsyncFunction object; promises behaviour (use .then() etc...)
async function readDatabase() {
    // ES6 destructuring to take out body from the JSON and call it databaseDefinition
    const { body: databaseDefinition } = await client.database(databaseId).read();
    console.log(`Reading database: ${databaseDefinition.id}\n`);
}

// let's read the container
async function readContainer() {
    // await to wait for the promise - need to obtain containerDefinition before proceeding
    const { body: containerDefinition } = await client.database(databaseId).container(containerId).read();
    console.log(`Reading container: ${containerDefinition.id}\n`);
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

    const { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
    // of is ES 6 syntax for iteration
    for (var queryResult of results) {
        let resultString = JSON.stringify(queryResult);
        console.log(`\t${resultString}\n`);
    }
}

async function cleanup() {
    await client.database(databaseId).delete();

    
}

createDatabase()
    .then(() => readDatabase())
    .then(() => createContainer())
    .then(() => readContainer())
    .then(() => createTweets())
    .then(() => queryTweets())
    //.then(() => cleanup())
    .then(() => { console.log("Great success"); process.exit(0) })
    .catch((error) => { console.log(JSON.stringify(error));process.exit(1)});