function makeSlug(min, max){
	var t = '';
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
	for(let i in arr) {
		if(arr[i].id == id) {
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