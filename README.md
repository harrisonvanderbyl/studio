
# ships.io

// https://github.com/Samuel-Clarke123/ships.io.git

A simple web game, hosted on nodeJS using Sockets.io.


## TODO / RoadMap

- [x] Ship, sea, base code, actors, etc implemented (proj init)
- [x] Boundaries implemented
- [x] Timestep implemented
- [x] 'Attraction' implemented (like traditional velocity, gets added to the force of an actor in update(), it's a 2dVec)
- [x] 'Attraction' also effects angle
- [x] Possibly even split the actor into two classes: simple actors, and dynamic actors (dynamic actors inherit from simple actors), but have more physics stuff implemented, like boundaries, drag, attraction, collision.
- [x] Collision code implemented for actors (just detecting collision, for now)
- [ ] BlackHole can spawn, exist, and be drawn.
- [ ] BlackHole can attract Actors
- [ ] BlackHole gets activation timer
- [ ] BlackHole gets different drawings/colors for activated/deactivated
- [ ] Ship spits out actors parented to the ship
- [ ] Ship spits out BlackHoles parented to the ship
- [ ] <<< play test >>>
- [ ] Ship death function implemented (goes invisible (except for death anim) and collision/shooting gets disabled)
- [ ] Ship dies on collision with activated BlackHoles
- [ ] <<< play test >>>
- [ ] Decay code for BlackHoles
- [ ] Merge code for BlackHoles
- [ ] <<< play test >>>
- [ ] Un-interactable stars get generated for drawing (just on the client side!)
- [ ] Un-interactable stars get better decoration and drawing
- [ ] Pulse effects for BlackHoles
- [ ] More particle effects


## Sea

Main refers to either server.js or client.js, they both control the game, only client.js draws.
Server.js consistently receives updates, and sends those updates out to the clients.
Main controls a sea object, which holds the majority of the game.
Sea holds boats, and islands.
Boats hold missiles

Actors, in general, assume a vel and an ang. An update func, and a draw func. An importState, and an exportState

\ ゜o゜)ノ