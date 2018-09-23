/* global Actor Ship Victor */
class Sea {
  constructor (seaid, size, maxPlayers=10, actors=[]) {
    this.maxPlayers = maxPlayers;
    this.actors = actors;
    this.seaid = seaid;
    this.ticker = 0;
    this.players = 0;
    this.size = size;
    
    for(let i in this.actors) {
      if(this.actors[i].type == 'ship') this.players += 1;
    }
    this.keyBuffers = {};
  }
  
  getActorById(pid, tactors=this.actors) {
    for(let i in tactors) {
      if(tactors[i].id == pid) return tactors[i];
    }
    return false;
  }

  deregister() { // THIS MUST BE CALLED BEFORE THE SEA IS DESTROYED (at least on the server side, i guess)
    clearEventListener(this.ticker);
  }
  
  importState(state) {
    for(let i in state.actors) {
      let tstate = state.actors[i];
      let actor = this.getActorById(state.actors[i].id);
      if(actor) {
        actor.importState(state.actors[i]);
      } else {
        console.log("(in sea.importState) couldn't find ship with id of",tstate.id,"choosing to create one");
        let s = new Ship(tstate.id);
        s.importState(tstate);
        this.addPlayer(s);
        //console.log("created ship with id",s.id);
      }
    }
    for(let i in this.actors) {
      let actor = this.getActorById(this.actors[i].id, state.actors);
      if(actor == false) {
        console.log('removing actor with id of ' + this.actors[i].id);
        // the actor doesn't exist in the new state, it should be removed.
        this.removeActorByIndex(i);
      }
    }
  }
  
  exportState(){
    let state = {actors: []};
    for(let i in this.actors) {
      if(this.actors[i]) {
        state.actors.push(this.actors[i].exportState());
      } else {
        console.log("warning! tried to export empty actor.");
      }
    }
    return state;
  }
  
  update() {
    for (let pid in this.keyBuffers) { // update the keys pressed, for each user.
      let player = this.getActorById(pid);
      if(player) {
        player.keys = this.keyBuffers[pid];
      }
    }

    for (let i in this.actors) {
      this.actors[i].update();
    }
  }

  draw(ctx, pid) {

  }

  addPlayer(ship) {
    this.players += 1;
    this.actors.push(ship);
  }
  removeActorById(pid) {
    for(let i in this.actors) {
      if(this.actors[i].id == pid) {
        if(this.actors[i].type == 'ship') this.players -= 1;
        this.actors.splice(i, 1);
      }
    }
  }
  removeActorByIndex(i) {
    if(this.actors[i].type == 'ship') this.players -= 1;
    this.actors.splice(i, 1);
  }

  get isFull() {
    return this.players >= this.maxPlayers;
  }
}
