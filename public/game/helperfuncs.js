function makeSlug(min, max) {
	let t = '';
	for (let i = 0; i < min + Math.floor(Math.random() * (max - min)); i++) {
		let base = 65 + Math.random() * 25;
		if (Math.random() < 0.4) {
			base += 32;
		} else if (Math.random() < 0.3) {
			base = 48 + Math.random() * 9;
		}
		t += String.fromCharCode(base);
	}
	return t;
}

function closestTurnDirFromAngs(angFrom, angTo) {
	let fromto = angTo - angFrom;
	if (fromto < 0) fromto += Math.PI * 2;
	return fromto < Math.PI ? 1 : -1;
	//return closestTurnDir(new Victor(1, 0).rotate(angFrom), new Victor(1, 0).rotate(angTo));
}

function closestTurnDir(from, to) {
	let cross = to.cross(from);
	return cross < 0 ? 1 : -1;
}

function angleBetweenVectors(a, b) {
	return Math.atan2(a.y - b.y, a.x - b.x);
}

function vecIsInRange(vec, topLeft, botRight) {
	if (vec.x > topLeft.x && vec.x < botRight.x && vec.y > topLeft.y && vec.y < botRight.y) return true;
	return false;
}

function correctAng(ang) {
	while(ang > Math.PI) ang -= Math.PI*2;
	while(ang < -Math.PI) ang += Math.PI*2;
	return ang;
}

function getIndexOfActorById(id, arr) {
	for (let i in arr) {
		if (arr[i].id == id) {
			return i;
		}
	}
	return -1;
}

function clampVec(vec, min, max) {
	let tvec = vec.clone();
	tvec.x = Math.max(min.x, Math.min(tvec.x, max.x));
	tvec.y = Math.max(min.y, Math.min(tvec.y, max.y));
	return tvec;
}

function createCamera(playerPos, screenDims, seaDims) {
	let cam = playerPos.clone();
	cam = clampVec(
		cam,
		new Victor(0, 0).add(screenDims.clone().divide(new Victor(2, 2))),
		seaDims.subtract(screenDims.clone().divide(new Victor(2, 2)))
	);
	cam.subtract(screenDims.divide(new Victor(2, 2)));
	return cam;
}

function toRad(deg) {
	return deg * Math.PI / 180;
}

function toDeg(rad) {
	return rad / Math.PI * 180;
}

function drawScopes(screenDims, ctx, lines = 8) {
	ctx.beginPath();
	for (let i = 0; i < screenDims.x; i += screenDims.x / lines) {
		drawScopeLine(i, 0, 0, screenDims.y, screenDims.x, ctx);
	}
	for (let i = 0; i < screenDims.y; i += screenDims.y / lines) {
		drawScopeLine(0, i, screenDims.x, 0, screenDims.y, ctx);
	}
	ctx.closePath();
}

function drawScopeLine(a1, b1, a2, b2, check, ctx) {
	ctx.strokeStyle = '#00660011';
	ctx.lineWidth = 1;
	if (a1 % (check / 4) == 0 || b1 % (check / 4) == 0) ctx.lineWidth = 2;
	if (a1 % (check / 2) == 0 || b1 % (check / 2) == 0) ctx.lineWidth = 3;

	ctx.moveTo(a1, b1);
	ctx.lineTo(a1 + a2, b1 + b2);
	ctx.stroke();
}
