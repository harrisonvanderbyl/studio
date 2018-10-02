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
		image = "#332233", 
		weight = 6
	) {
		super(id, pos, mode, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, 
			attraction, obeysBoundarys, "bh", image, weight);
		this.framelife = framelife;
		this.pid = pid;
	}

	attract(sea) {
		for(let i in sea.actors) {
			if(sea.actors[i].id != this.id) {
				let tactor = sea.actors[i];
				let tdist = Math.max(this.pos.distance(tactor.pos) + 1, opts.MIN_ATTRACT_STRENGTH_DIST);
				if(tdist < opts.MIN_ATTRACT_DIST) {
					let tmass = tactor.mass;
					let attractionStrength = 1/tdist * this.mass * opts.BLACKHOLE_STRENGTH / tmass;
					let vecTo = new Victor(0, 1).rotate(angleBetweenVectors(tactor.pos, this.pos)+Math.PI/2)
									.multiply(new Victor(attractionStrength, attractionStrength));
					tactor.attractionBuffer.add(vecTo);
				}
			}
		}
	}
	merge(sea) {
		for(let i in sea.actors) {
			if(sea.actors[i].id != this.id && (sea.actors[i].type == "ship" || this.mass < sea.actors[i].mass)) {
				if(sea.actors[i].isTouchingActor(this)) {
					if(sea.actors[i].type == "bh") {
						sea.actors[i].mass += this.mass;
						let nforce = sea.actors[i].force.add(this.force);
						sea.actors[i].vel = nforce.length();
						sea.actors[i].ang = nforce.angle()-Math.PI/2;
						sea.removeActorById(this.id);
					} else if(sea.actors[i].type == "ship") {
						sea.actors[i].kill();
					}
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
		this.mass -= ((this.mass * opts.HAWKING_RADIATION) + opts.FLAT_RADIATION) * opts.TIMESTEP;
	}

	post_update(sea) {
		super.post_update(sea);

		if(this.framelife > 0) this.framelife -= 1 * opts.TIMESTEP;
		else {
			this.merge(sea);
		}
	}

	draw(ctx, cam) {
		super.draw(ctx, cam);
	}
}