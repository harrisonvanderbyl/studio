const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();

const Victor = require('victor');
const gm = require('./build/out.js');

const SEAS_LIMIT=gm.opts.SEAS_LIMIT;
const FPS=gm.opts.FPS;
const TICKFREQ=Math.floor(1000 / FPS);

let seas = [];

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
  
  socket.on('pingoid', function(msg, pid) {
    socket.emit('pongoid', msg, pid);
  });
  
  socket.on('keydown', function(room, pid, key) {
    //console.log("keydown in room:", room, " player:", pid, " key:", key);
    let keyBuf = seas[room].getPlayerById(pid).retKey(key, true);
    seas[room].keyBuffers[pid] = keyBuf;
  });
  
  socket.on('keyup', function(room, pid, key) {
    //console.log("keyup in room:", room, " player:", pid, " key:", key);
    let keyBuf = seas[room].getPlayerById(pid).retKey(key, false);
    seas[room].keyBuffers[pid] = keyBuf;
  });
  
  socket.on('enter lobby', function(seaid, pid) {
    if(seaid >= SEAS_LIMIT) return socket.emit('weberror', "No lobby found.\nPlease refresh the browser, and try again.");
    if(seaid == -1) {
      do {
        seaid += 1;
      } while(seas[seaid] && seas[seaid].isFull);
    }
    if(!seas[seaid]) {
      seas[seaid] = new gm.Sea(seaid, gm.opts.SEA_SIZE);
      setInterval(updateSea, TICKFREQ, seaid);
      console.log("created new sea: " + seaid + " tickfreq: " + TICKFREQ);
    }

    let tpos = new Victor(0, 0).randomize(new Victor(0, 0), seas[seaid].size);
    let pship = new gm.Ship(pid, tpos);
    console.log(pship.id);
    seas[seaid].actors.push(pship);

    let toClient = {
      sea: seas[seaid].exportState(),
      seaid: seaid
    }

    socket.emit('new game', toClient);
  });
});

function updateSea(seaid) { // todo: make this actually multithreaded. (if we want to use experimental builds of nodejs lol) 
// todo: remove these dumb todo's
  let sea = seas[seaid];
  sea.update();
}

http.listen(process.env.PORT, function(){
  console.log('listening on *:'+process.env.PORT);
});