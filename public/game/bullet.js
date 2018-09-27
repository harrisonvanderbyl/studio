class Bullet extends Actor {
	constructor(
		id,
		pos = new Victor(10, 10),
		size = new Victor(30, 30),
		vel = 0.5,
		ang = 0,
		accel = 1.4,
		velCap = 8,
		turnSpeed = 0.25,
		brakeSpeed = 0,
		obeysBoundarys = false,
		bulletSpeed = 2.1,
		image = "#6600ff"
	) {
		super(id, pos, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, obeysBoundarys, "ship", image);
		this.keys = { left: false, right: false, forward: false, backward: false};
		this.bulletSpeed = bulletSpeed;
		this.bullets = [];
	}

	get headVector() {
		return this.pos.clone().add(this.force.multiply(new Victor(3, 3)));
	}
}