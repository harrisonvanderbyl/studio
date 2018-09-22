class Actor {
  constructor(pos, size, vel, ang, mode="client") {
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    this.ang = ang;
    this.friction = 0.004;
    this.image = "";
    this.frameRate = -1;
    this.mode = mode;
  }
  
  update() {
    if(vel > 0.1) {
      this.vel *= (1-this.friction);

      let force = p5.Vector.fromAngle(ang);
      force.mult(this.vel);

      this.pos.add(force);
    }
  }
  
  draw() {
    if(this.image[0] == "#") {
      fill(this.image);
      rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    } else {
      //TODO sprite rendering
    }
  }
}
