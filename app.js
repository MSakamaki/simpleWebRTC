'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//var io = require('socket.io').listen(port);

//var io = require('socket.io')(server);
var port = 9001;

// app server 
app.use(express.static(__dirname + '/public'));
server.listen(port,process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined
  , function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

// web socket 

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('user disconnected');
  });
});
