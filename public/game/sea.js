class Sea {
  constructor (maxPlayers=10, actors=[]) {
    this.maxPlayers = maxPlayers;
    
    //these are all actors
    this.actors = actors;

    this.players = 0;
    for(i in this.actors) {
      if(this.actors[i].type == 'ship') this.players += 1;
    }
  }
  
  update() {
    for (let i in this.actors) {
      this.actors[i].update();
    }
  }

  addPlayer(ship) {
    this.players += 1;
  }

  get isFull() {
    return this.players >= this.maxPlayers;
  }
}
