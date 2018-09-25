/* global Victor */
class Actor {
	constructor(id, pos, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, image, mode = "client") {
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
		this.brakeSpeed = brakeSpeed;
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
		this.ang += dir * (this.turnSpeed / ((this.vel + 6) / 4));
	}

	boost() {
		// accelerates the ships velocity.
		this.vel += this.accel / Math.max(this.vel, 1);
	}

	brake() {
		this.vel *= (1-this.brakeSpeed);
	}

	draw(ctx, cam) {
		if (this.image[0] == "#") {
			//TODO rectangle rendering
			ctx.fillStyle = this.image;
			let centerPos = new Victor(this.pos.x, this.pos.y);
			ctx.save();
			ctx.translate(centerPos.x, centerPos.y);
			ctx.rotate(this.ang);
			ctx.lineWidth = 4;
			ctx.strokeStyle = "#cecefe";
			ctx.beginPath();
			ctx.moveTo(0, this.size.y / 2);
			ctx.lineTo(this.size.x / 2, -this.size.y / 2);
			ctx.lineTo(0, -this.size.y / 3);
			ctx.lineTo(-this.size.x / 2, -this.size.y / 2);
			ctx.lineTo(0, this.size.y / 2);
			ctx.closePath();
			ctx.stroke();
			//ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
			ctx.restore();
		} else {
			//TODO sprite rendering
		}
	}
}
