class BlackHole extends Actor {
	constructor(
		id,
		pid,
		pos = new Victor(200, 200),
		vel = 0.5,
		mode = "client",
		ang = 0,
		framelife = 60,
		size = new Victor(15, 15),
		accel = 1.4,
		velCap = 8,
		turnSpeed = 0.25,
		brakeSpeed = 0.1,
		attraction = new Victor(0, 0),
		obeysBoundarys = false,
		image = "#332233"
	) {
		super(id, pos, mode, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, 
			attraction, obeysBoundarys, "bh", image);
		this.framelife = framelife;
		this.pid = pid;
	}

	get mass() {
		return this.size.x*this.size.y;
	}

	set mass(m) {
		let tt = Math.sqrt(m);
		this.size.x = tt;
		this.size.y = tt;
	}

	attract(sea) {
		for(let i in sea.actors) {
			if(sea.actors[i].id != this.id) {
				let tactor = sea.actors[i];
				let tdist = this.pos.distance(tactor.pos) + 1;
				if(tdist < opts.MIN_ATTRACT_DIST) {
					let attractionStrength = 1/tdist * this.mass * opts.BLACKHOLE_STRENGTH;
					let vecTo = new Victor(0, 1).rotate(angleBetweenVectors(tactor.pos, this.pos))
									.multiply(new Victor(attractionStrength, attractionStrength));
					tactor.attractionBuffer.add(vecTo);
				}
			}
		}
	}

	exportState() {
		let state = super.exportState();
		state.framelife = this.framelife;
		state.pid = this.pid;
		return state;
	}

	importState(state) {
		super.importState(state);
		this.framelife = state.framelife;
		this.pid = state.pid;
	}

	update(sea) {
		super.update(sea);

		if(this.framelife <= 0) {
			super.brake();
			this.attract(sea);
		}
	}

	post_update(sea) {
		super.post_update(sea);

		if(this.framelife > 0) this.framelife -= 1 * opts.TIMESTEP;
	}

	draw(ctx, cam) {
		super.draw(ctx, cam);
	}
}