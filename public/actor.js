function Actor(pos, vel, ang) {
  this.pos = pos;
  this.vel = vel;
  this.ang = ang;
  this.friction = 0.004;
  this.image = "";
  
  this.update = () => {
    this.vel *= (1-this.friction);
  }
  
  this.draw = () => {
    
  }
}

try {
  exports.Actor = Actor;
} catch (ReferenceError) {}