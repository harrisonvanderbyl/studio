/* global Actor Sea Victor $ opts makeSlug io URL Ship */

$(function() {
    let cnv = document.getElementById("main-canv");
    let ctx = cnv.getContext("2d");
    
    let GAME_IS_READY = false;
    
    let sea = new Sea();
    const socket = io();
    const mid = makeSlug(10, 10);
    
    let url = new URL(window.location.href);
    let roomNum = url.searchParams.get("room") || -1;
    
    socket.on('pongoid', function(msg) {
        let latency = Date.now() - msg;
        $("#ping-holder").text("Ping: " + latency);
        setTimeout(function() {socket.emit('pingoid', Date.now());}, 1000);
    });
    socket.emit('pingoid', Date.now());
    
    function setup() {
        socket.emit("enter lobby", roomNum, mid);

        socket.on("weberror", function(err) {
            alert(err);
        })
    
        socket.on("new game", function(data) {
            console.log("connection made to a new game!");
            console.log(data);
            
            roomNum = data.seaid;
            sea.importState(data.sea);
            
            GAME_IS_READY = true;
        });
        
        document.addEventListener('keydown', function(e) {
            sea.getActorById(mid).setKey(e.keyCode, true);
            socket.emit('keydown', roomNum, mid, e.keyCode);
        });
        document.addEventListener('keyup', function(e) {
            sea.getActorById(mid).setKey(e.keyCode, false);
            socket.emit('keyup', roomNum, mid, e.keyCode)
        });
    } setup();
    
    function draw() {
        if(GAME_IS_READY) {
            let player = sea.getActorById(mid);
            
            if(player) {
               player.update();
               player.draw();
            } else {
                console.log("Warning! Player not found. Was looking for: " + mid + " got " + player);
            }
            //console.log(player.keys);
        }
    } setInterval(draw, opts.FPS)
})