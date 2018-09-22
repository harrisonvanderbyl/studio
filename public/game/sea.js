class Sea {
  constructor (seaid, maxPlayers=10, actors=[]) {
    this.maxPlayers = maxPlayers;
    this.pos = new Victor(20, 30);
    //these are all actors
    this.actors = actors;
    this.seaid = seaid;
    this.ticker = 0;
    this.players = 0;
    for(i in this.actors) {
      if(this.actors[i].type == 'ship') this.players += 1;
    }
  }

  deregister() { // THIS MUST BE CALLED BEFORE THE SEA IS DESTROYED (at least on the server side, i guess)
    clearEventListener(this.ticker);
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
