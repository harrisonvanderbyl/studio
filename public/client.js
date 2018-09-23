/* global Actor Sea Victor $ opts makeSlug io URL Ship */

$(function() {
    let cnv = document.getElementById("main-canv");
    let ctx = cnv.getContext("2d");
    
    let GAME_IS_READY = false;
    
    let sea = new Sea();
    const socket = io();
    const mid = makeSlug(10, 10);

    let playerMissingBuffer = 0;
    
    let url = new URL(window.location.href);
    let roomNum = url.searchParams.get("room") || -1;
    
    function setup() {
        console.log("my player id is: ",mid);
        socket.emit("enter lobby", roomNum, mid);

        socket.on("fatalerror", function(err) {
            alert(err);
            GAME_IS_READY = false;
        });

        socket.on('pongoid', function(msg) {
            let latency = Date.now() - msg;
            $("#ping-holder").text("Ping: " + latency);
            setTimeout(function() {socket.emit('pingoid', Date.now(), mid);}, 1000);
        });
        socket.emit('pingoid', Date.now(), mid);
    
        socket.on("new game", function(data) {
            console.log("connection made to a new game!");
            
            roomNum = data.seaid;
            sea.importState(data.sea);
            
            GAME_IS_READY = true;
        });

        socket.on("heartbeat", function(data) {
            sea.importState(data);
            if(sea.getActorById(mid).keys.left) console.log("you are holding left!");
        })

        function onKeyEv(e, tf) {
            let player = sea.getActorById(mid);
            sea.keyBuffers[mid] = player.retKey(e.keyCode, false);
            socket.emit((tf ? 'keydown' : 'keyup'), roomNum, mid, e.keyCode)
        }
        
        document.addEventListener('keydown', function(e) {
            onKeyEv(e, true);
        });
        document.addEventListener('keyup', function(e) {
            onKeyEv(e, false);
        });
    } setup();
    
    function draw() {
        if(GAME_IS_READY) {
            let player = sea.getActorById(mid);
            
            if(player) {
                playerMissingBuffer = 0;
                sea.update();
                sea.draw(ctx, mid);
            } else {
                playerMissingBuffer += 1;
                if(playerMissingBuffer >= 10) {
                    alert("Couldn't find your player, 10 times in a row. Please refresh your browser, you probably just timed out!");
                    GAME_IS_READY = false;
                }
            }
            //console.log(player.keys);
        }
    } let drawFunc = setInterval(draw, Math.floor(1000 / opts.FPS))
})