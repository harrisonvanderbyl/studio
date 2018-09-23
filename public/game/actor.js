/* global Victor */
class Actor {
  constructor(pos, size, vel, ang, mode="client") {
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    this.ang = ang;
    this.friction = 0.004;
    this.image = "#ff00ff";
    this.frameRate = -1;
    this.mode = mode;
  }
  
  update() {
    if(this.vel > 0.1) {
      this.vel *= (1-this.friction);

      let force = new Victor(0, 1).rotate(this.ang); // this still uses p5, please use victor.js
      force.multiply(new Victor(this.vel, this.vel));

      this.pos.add(force);
    }
  }
  
  turn(dir=-1) { // -1 for left, +1 for right.
    this.ang += dir;
  }

  boost() { // accelerates the ships velocity.
    this.velocity+=1.0;
  }
  
  draw() {
    if(this.image[0] == "#") {
      //TODO rectangle rendering
      var c = document.getElementById("main-canv");
      var ctx = c.getContext("2d");
      ctx.fillStyle = this.image;
      ctx.fillRect(this.pos[0],this.pos[1],5,5);
    } else {
      //TODO sprite rendering
      var c = document.getElementById("main-canv");
      var ctx = c.getContext("2d");
       var img = document.getElementById("scream");
      ctx.drawImage(img,this.pos[0],this.pos[1],50,50);
    }
  }
}
