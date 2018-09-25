/* global Victor */
class Actor {
	constructor(id, pos, size, vel, ang, accel, velCap, turnSpeed, image, mode = "client") {
		this.id = id;
		this.pos = pos;
		this.size = size;
		this.vel = vel;
		this.ang = ang;
		this.friction = 0.01;
		this.image = image;
		this.frameRate = -1;
		this.mode = mode;
		this.accel = accel;
		this.velCap = velCap;
		this.turnSpeed = turnSpeed;
	}

	update() {
		if (this.vel > 0.1) {
			this.vel = Math.min(this.vel, this.velCap);
			this.vel *= 1 - this.friction;

			let force = new Victor(0, 1).rotate(this.ang);
			force.multiply(new Victor(this.vel, this.vel));

			this.pos.add(force);
		}
	}

	turn(dir) {
		// -1 for left, +1 for right.
		this.ang += dir * this.turnSpeed;
	}

	boost() {
		// accelerates the ships velocity.
		this.vel += this.accel / Math.max(this.vel, 1);
	}

	break() {
		this.vel;
	}

	draw(ctx, cam) {
		if (this.image[0] == "#") {
			//TODO rectangle rendering
			ctx.fillStyle = this.image;
			let drawPos = new Victor(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2);
			ctx.fillRect(drawPos.x, drawPos.y, this.size.x, this.size.y);
		} else {
			//TODO sprite rendering
		}
	}
}
