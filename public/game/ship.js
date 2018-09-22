class Ship extends Actor {
    constructor(id, isPlayer=false) {
        super();
        this.isPlayer = isPlayer;
        this.id = id;
        this.type = "ship";
    }

    turn(dir=-1) { // -1 for left, +1 for right.
        //stub
    }

    boost() { // accelerates the ships velocity.
        //stub
    }

    update() {
        //stub
    }

    draw() {
        //stub
    }
}
