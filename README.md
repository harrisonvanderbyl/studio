
# ships.io

// https://github.com/Samuel-Clarke123/ships.io.git

Alright so first of all, I'd like to apologise for ever writing this program.
See, I wanted to be really cool and efficient, and not repeat my code on the backend, right?
But there were so many incompatability errors between nodejs and my front end that... I just couldn't handle it.
So, I wrote a bash script, that copy pastes all of the javascript files in /public/game into /build/out.js,
which the server then reads.

Of course, then the module.exports was empty, right? I couldn't use require.
So, I fucking added another file, /public/nodeexportscript.js, which gets added at the very end.

I'm sincerely sorry for this horror. But at least it works.

## TODO

- [ ] a
- [x] b


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


\ ゜o゜)ノ