var subscriber=require("redis").createClient(6380, process.env.REDISHOST, 
    {auth_pass: process.env.REDISKEY,
     tls: {servername:  process.env.REDISHOST}});

subscriber.on("message", function(channel, message) {

    console.log(channel + " contains value of " + message);

});


subscriber.subscribe("gebadev1")