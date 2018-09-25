function makeSlug(min, max) {
	var t = "";
	for (var i = 0; i < min + Math.floor(Math.random() * (max - min)); i++) {
		var base = 65 + Math.random() * 25;
		if (Math.random() < 0.4) {
			base += 32;
		} else if (Math.random() < 0.3) {
			base = 48 + Math.random() * 9;
		}
		t += String.fromCharCode(base);
	}
	return t;
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
	cam = clampVec(cam, new Victor(0, 0), seaDims.subtract(screenDims));
	cam.subtract(screenDims.divide(new Victor(2, 2)));
	return cam;
}

function toRad(deg) {
	return (deg * Math.PI) / 180;
}

function toDeg(rad) {
	return (rad / Math.PI) * 180;
}

function drawScopes(cnv, ctx, lines = 8) {
	ctx.beginPath();
	for (let i = 0; i < cnv.width; i += cnv.width / lines) {
		drawScopeLine(i, 0, 0, cnv.height, cnv.width, ctx);
	}
	for (let i = 0; i < cnv.height; i += cnv.height / lines) {
		drawScopeLine(0, i, cnv.width, 0, cnv.height, ctx);
	}
	ctx.closePath();
}

function drawScopeLine(a1, b1, a2, b2, check, ctx) {
	ctx.strokeStyle = "#006600";
	ctx.lineWidth = 1;
	if (a1 % (check / 4) == 0 || b1 % (check / 4)) ctx.lineWidth = 2;
	if (a1 % (check / 2) == 0 || b1 % (check / 2)) ctx.lineWidth = 3;

	ctx.moveTo(a1, b1);
	ctx.lineTo(a1 + a2, b1 + b2);
	ctx.stroke();
}
