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
            console.log(data);
            
            roomNum = data.seaid;
            sea.importState(data.sea);
            
            GAME_IS_READY = true;
        });

        socket.on("heartbeat", function(data) {
            sea.importState(data);
            console.log(sea.actors[0].ang);
        })
        
        document.addEventListener('keydown', function(e) {
            sea.keyBuffers[mid] = player.retKey(e.keyCode, true);
            socket.emit('keyup', roomNum, mid, e.keyCode)
        });
        document.addEventListener('keyup', function(e) {
            sea.keyBuffers[mid] = player.retKey(e.keyCode, false);
            socket.emit('keyup', roomNum, mid, e.keyCode)
        });
    } setup();
    
    function draw() {
        if(GAME_IS_READY) {
            let player = sea.getActorById(mid);
            
            if(player) {
                playerMissingBuffer = 0;
                player.update();
                player.draw();
            } else {
                playerMissingBuffer += 1;
                if(playerMissingBuffer >= 20) {
                    alert("Couldn't find your player, 20 times in a row. Please refresh your browser, you probably just timed out!");
                    GAME_IS_READY = false;
                }
            }
            //console.log(player.keys);
        }
    } let drawFunc = setInterval(draw, Math.floor(1000 / opts.FPS))
})