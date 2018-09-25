/* global Victor Actor */
class Ship extends Actor {
	constructor(
		id,
		pos = new Victor(10, 10),
		size = new Victor(30, 30),
		vel = 0.5,
		ang = 0,
		accel = 1.2,
		velCap = 5,
		turnSpeed = 0.2,
		brakeSpeed = 0.1,
		image = "#6600ff"
	) {
		super(id, pos, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, image);
		this.type = "ship";
		this.keys = { left: false, right: false, forward: false, backward: false};
	}

	exportState() {
		let state = {
			pos: this.pos.toObject(),
			size: this.size.toObject(),
			ang: this.ang,
			vel: this.vel,
			keys: this.keys,
			id: this.id,
			type: this.type
		};

		return state;
	}

	importState(state) {
		this.pos = Victor.fromObject(state.pos);
		this.size = Victor.fromObject(state.size);
		this.ang = state.ang;
		this.vel = state.vel;
		this.keys = state.keys;
		this.id = state.id;
		this.type = state.type;
	}

	setKey(e, tf = true) {
		this.keys = this.retKey(e, tf);
	}

	retKey(e, tf = true) {
		let tkeys = this.keys;
		if (e == 37 || e == 65) tkeys.left = tf;
		if (e == 39 || e == 68) tkeys.right = tf;
		if (e == 38 || e == 87) tkeys.forward = tf;
		if (e == 40 || e == 83) tkeys.backward = tf;
		return tkeys;
	}

	update() {
		//stub
		if (this.keys.left) super.turn(-1);
		if (this.keys.right) super.turn(+1);

		if (this.keys.forward) super.boost();
		if (this.keys.backward) super.brake();

		super.update();
	}

	draw(ctx, cam) {
		//stub
		super.draw(ctx, cam);
	}
}
