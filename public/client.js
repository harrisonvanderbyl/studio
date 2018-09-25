/* global Actor Sea Victor $ opts makeSlug io URL Ship */

$(function() {
	let cnv = document.getElementById("main-canv");
	let ctx = cnv.getContext("2d");

	cnv.setAttribute("width", 500);
	cnv.setAttribute("height", 500);

	let screenDims = new Victor(cnv.width, cnv.height);
	console.log("screeDims", screenDims);

	let GAME_IS_READY = false;

	let sea = new Sea();
	const socket = io();
	const mid = makeSlug(10, 10);

	let playerMissingBuffer = 0;
	let framesDrawn = 0;

	let url = new URL(window.location.href);
	let roomNum = url.searchParams.get("room") || -1;

	function setup() {
		console.log("my player id is: ", mid);
		socket.emit("enter lobby", roomNum, mid);

		socket.on("fatalerror", function(err) {
			alert(err);
			GAME_IS_READY = false;
		});

		socket.on("pongoid", function(msg) {
			let latency = Date.now() - msg;
			let player = sea.getActorById(mid);

			$("#game-ping").text("Ping: " + latency);

			if (player) {
				$("#ship-posx").text(Math.floor(player.pos.x * 100) / 100);
				$("#ship-posy").text(Math.floor(player.pos.y * 100) / 100);
				$("#ship-ang").text(Math.floor(player.ang * 100) / 100);
				$("#ship-vel").text(Math.floor(player.vel * 100) / 100);
			}

			setTimeout(function() {
				socket.emit("pingoid", Date.now(), mid);
			}, 500);
		});
		socket.emit("pingoid", Date.now(), mid);

		socket.on("new game", function(data) {
			console.log("connection made to a new game!");

			roomNum = data.seaid;
			sea.importState(data.sea);

			GAME_IS_READY = true;
		});

		socket.on("heartbeat", function(data) {
			sea.importState(data);
		});

		function onKeyEv(e, tf) {
			let player = sea.getActorById(mid);
			sea.keyBuffers[mid] = player.retKey(e.keyCode, false);
			socket.emit(tf ? "keydown" : "keyup", roomNum, mid, e.keyCode);
		}

		document.addEventListener("keydown", function(e) {
			onKeyEv(e, true);
		});
		document.addEventListener("keyup", function(e) {
			onKeyEv(e, false);
		});
	}
	setup();

	function tick() {
		if (GAME_IS_READY) {
			let player = sea.getActorById(mid);

			if (player) {
				playerMissingBuffer = 0;
				sea.update();
			} else {
				playerMissingBuffer += 1;
				if (playerMissingBuffer >= 10) {
					alert(
						"Couldn't find your player, 10 times in a row. Please refresh your browser, you probably just timed out!"
					);
					GAME_IS_READY = false;
				}
			}
			//console.log(player.keys);
		}
	}
	let tickFunc = setInterval(tick, Math.floor(1000 / opts.FPS));

	function draw() {
		if (GAME_IS_READY) {
			let player = sea.getActorById(mid);
			let cam = createCamera(player.pos.clone(), screenDims.clone(), sea.size.clone());

			ctx.fillStyle = "rgba(150, 150, 250, 0.35)";
			ctx.fillRect(0, 0, cnv.width, cnv.height);
			drawScopes(cnv, ctx, 4);
			ctx.translate(-cam.x, -cam.y);
			sea.draw(ctx, cam);
			ctx.translate(cam.x, cam.y);

			framesDrawn++;
		}
	}
	let drawFunc = setInterval(draw, Math.floor(1000 / opts.FPS));

	function updateFPS() {
		let fps = framesDrawn;
		framesDrawn = 0;
		$("#game-fps").text(fps);
	}
	let updateFPSFunc = setInterval(updateFPS, 1000);
});
