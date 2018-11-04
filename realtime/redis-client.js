// load environment variables from .env file
require('dotenv').config();

var redis = require("redis");
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function testRedis() {

    var client=redis.createClient(6380, process.env.REDISHOST, 
        {auth_pass: process.env.REDISKEY,
         tls: {servername:  process.env.REDISHOST}});    
    
    client.on('error', err => {
        console.log('Error occurred: ' + err);
    })
    
    client.on('connect', () => console.log('Connected'));

    // set a value
    console.log(await client.setAsync("key1", "my value"));

    // get a value
    console.log(await client.getAsync("key1"));

    // set field in a hash
    console.log(await client.hmsetAsync('myhash', 'myfield1', 100, 'myfield2', 200));
    

    // get field from hash
    console.log(await client.hgetAsync('myhash', 'myfield2'));

    client.quit();
}

testRedis().then(() => console.log("The END!!!"));

