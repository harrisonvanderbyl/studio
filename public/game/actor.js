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
  
  draw(ctx, cam) {
    if(this.image[0] == "#") {
      //TODO rectangle rendering
      ctx.fillStyle = this.image;
      ctx.fillRect(this.pos.x - this.size.x + this.cam.x, this.pos.y - this.size.y + this.cam.x, this.size.x, this.size.y);
    } else {
      //TODO sprite rendering
      var img = document.getElementById("scream");
      ctx.drawImage(img, this.pos[0], this.pos[1], 50, 50);
    }
  }
}
