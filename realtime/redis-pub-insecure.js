// load environment variables from .env file
require('dotenv').config();

var client=require("redis").createClient(6379, '13.80.243.227');

client.on('error', function(err) {
    console.log('Error occurred: ' + err);
})

setInterval( function() {
    console.log("Publishing...");
    client.publish("mydevice", JSON.stringify({"temperature": Math.random() * 40}));
    
}, 1800);



