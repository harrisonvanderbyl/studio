class BlackHole extends Actor {
	constructor(
		id,
		pos = new Victor(200, 200),
		size = new Victor(30, 30),
		vel = 0.5,
		ang = 0,
		accel = 1.4,
		velCap = 8,
		turnSpeed = 0.25,
		brakeSpeed = 0,
		obeysBoundarys = false,
		image = "#6600ff"
	) {
		super(id, pos, size, vel, ang, accel, velCap, turnSpeed, brakeSpeed, obeysBoundarys, "blackhole", image);
	}
	get mass() {
		return this.size.x;
	}
	set mass(m) {
		this.size.x = m;
		this.size.y = m;
	}
}