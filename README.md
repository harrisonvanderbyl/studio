
# ships.io

// https://github.com/Samuel-Clarke123/ships.io.git

A simple web game, hosted on nodeJS using Sockets.io.


## TODO

- [ ] get the game to a functioning state where this even means anything


## Map

Main refers to either server.js or client.js, they both control the game, only client.js draws.
Server.js consistently receives updates, and sends those updates out to the clients.
Main controls a map object, which holds the majority of the game.
Map holds boats, and islands.
Boats hold missiles

Actors, in general, assume a vel and an ang. An update func, and a draw func.

```javascript
function Actor(type, pos, vel, ang, img) {
  this.pos = pos;
}
```

\ ゜o゜)ノ