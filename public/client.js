$(function() {
    let sea, player;
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

    socket.emit("enter lobby", roomNum, mid);

    socket.on("weberror", function(err) {
        alert(err);
    })

    socket.on("new game", function(data) {
        
    })
    
    function setup() {
      
    }
    
    function draw() {
      
    }
})