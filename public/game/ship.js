/* global Victor Actor */
class Ship extends Actor {
    constructor(id, pos=new Victor(100, 100), size=new Victor(100, 100), vel=0.5, ang=0) {
        super(pos, size, vel, ang);
        this.id = id;
        this.type = "ship";
        this.keys = {left: false, right: false, forward: false};
    }

    exportState() {
        let state  = {};
        
        state.pos  = this.pos;
        state.size = this.size;
        state.ang  = this.ang;
        state.vel  = this.vel;
        state.keys = this.keys;
        state.id   = this.id;
        state.type = this.type;
    
        return state;
    }
    
    importState(state) {
        this.pos  = new Victor(state.pos);
        this.size = new Victor(state.size);
        this.ang  = state.ang;
        this.vel  = state.vel;
        this.keys = state.keys;
        this.id   = state.id;
        this.type = state.type;
    }
    
    setKey(e, tf=true) {
        this.keys = this.retKey(e, tf);
    }
    
    retKey (e, tf=true) {
        let tkeys = this.keys;
        if(e == 37 || e == 65) tkeys.left    = tf;
        if(e == 39 || e == 68) tkeys.right   = tf;
        if(e == 38 || e == 87) tkeys.forward = tf;
        return tkeys;
    }
    
    update() {
        //stub
        if(this.keys.left) super.turn(-1);
        if(this.keys.right) super.turn(+1);
        
        super.turn(this.dir);
        
        if(this.keys.forward) {
           super.boost();
        }
    
        super.update();
    }

    draw() {
        //stub
        super.draw();
    }
}
