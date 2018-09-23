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
      let actor = this.getActorById(state.actors[i].id);
      if(actor) {
        this.actors[i].importState(state.actors[i]);
      } else {
        if(state.actors[i].type == "ship") {
          let tship = new Ship();
          tship.importState(state.actors[i]);
          this.actors.push(tship);
        }
      }
    }
    for(let i in this.actors) {
      let actor = this.getActorById(this.actors[i], state);
      if(!actor) {
        // the actor doesn't exist in the new state, it should be removed.
        this.actors.splice(i, 1);
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
    for (let i in this.actors) {
      this.actors[i].update();
    }
  }

  addPlayer(ship) {
    this.players += 1;
    this.actors.push(ship);
  }

  get isFull() {
    return this.players >= this.maxPlayers;
  }
}
