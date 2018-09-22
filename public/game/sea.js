class Sea {
  constructor (actors=[]) {
    //these are all actors
    this.actors = actors;
  }
  
  update() {
    for (let i in this.actors) {
      this.actors[i].draw();
    }
  }
}