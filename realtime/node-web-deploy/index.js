
var express = require('express');
var path = require('path');
var app= express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*'});
var port = process.env.PORT||8888;


if(process.env.REDISPORT=='6379') {
    console.log("Not using TLS and authentication");
    var subscriber=require("redis").createClient(process.env.REDISPORT||6380, process.env.REDISHOST);
        
} else {
    console.log("Using TLS and authentication");
    var subscriber=require("redis").createClient(process.env.REDISPORT||6380, process.env.REDISHOST, 
        {auth_pass: process.env.REDISKEY,
        tls: {servername:  process.env.REDISHOST}}); 
}


app.get('/', function(req,res,next){
    res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', function(socket){
    console.log("Connection from " + socket.id);
    socket.on('channel', function(channel){
        console.log('Message from client for: ' + channel);
        socket.join(channel);
    });
});

subscriber.on("pmessage", function(pattern,channel, message){
    console.log("Message from " + channel + " was: " + message);
    io.sockets.in(channel).emit('message', message);
});

subscriber.on('error', function(err) {
    console.log('An error occurred ' + err);
});

subscriber.psubscribe("*");


server.listen(port, function() {
    console.log('Listening on port ' + port);
       
});

