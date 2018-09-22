var Actor = (pos, vel, ang)=>{
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
/* example syntax: class Ship extends Actor {
  super(); // calls the constructor of actor on this function. MUST BE CALLED BEFORE REFERENCING THISDOT
}*/