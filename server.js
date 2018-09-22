const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const gm = require('./build/out.js');

const SEAS_LIMIT=10;

let seas = [];

app.use(express.static('public'));

app.get("/", function (req, res) {
  console.log(req.roomid);
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
  socket.on('pingoid', function(msg) {
    socket.emit('pongoid', msg);
  });
  socket.on('enter lobby', function(seaid, pid) {
    if(seaid >= SEAS_LIMIT) return socket.emit('weberror', "no lobby found");
    if(seaid == -1) {
      do {
        seaid += 1;
      } while(seas[seaid].isFull)
    }
    if(!seas[seaid]) {
      seas[seaid] = new gm.Sea();
      console.log("created new sea: " + seaid);
    }

    let pship = new gm.Ship();
    pship.id = pid;

    let toClient = {
      player: pship,
      sea: seas[seaid],
    }

    socket.emit('new game', toClient);
  });
});

setInterval(function() {

}, 33);

http.listen(3000, function(){
  console.log('listening on *:3000');
});