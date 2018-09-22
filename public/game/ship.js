class Ship extends Actor {
    constructor(id, isPlayer=false) {
        super();
        this.isPlayer = isPlayer;
        this.id = id;
        this.type = "ship";
        this.keys = {};
    }

    turn(dir=-1) { // -1 for left, +1 for right.
        //stub
    }

    boost() { // accelerates the ships velocity.
        //stub
    }

    update() {
        //stub
        if(this.keys.left && !this.keys.right) {
            this.turn(left);
        } else if(this.keys.right) {
            this.turn(right);
        }
        if(this.keys.forward) {
            this.boost();
        }

        super.update();
    }

    draw() {
        //stub
        super.draw();
    }
}
