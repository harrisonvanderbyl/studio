const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const game = require('./build/out.js');

let sea = new game.Sea();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
  socket.on('pingoid', function(msg) {
    socket.emit('pongoid', msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});