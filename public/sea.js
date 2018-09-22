function Sea(mode="client", actors=[]) {
  //these are all actors
  this.actors = actors;
  
  //if on client side, draw updates the map
  if(mode == "client") {
    this.draw = () => {
      for (let i in this.actors) {
        this.actors[i].draw();
      }
    }
  }
  else //if on server, send updates to *the clients, with socket.emit* 
  {}
  
  this.update = () => {
    for (let i in this.actors) {
      this.actors[i].update();
    }
  }
}

try {
  exports.Sea = Sea;
} catch (ReferenceError) {}