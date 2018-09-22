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
    
    function setup() { // WE CANT USE P5.JS ... a lot of its helper functions would be used in classes. and they aren't supported to be ported to node!
    // instead, we could look at something like math.js, or victor.js who knows
        socket.emit("enter lobby", roomNum, mid);

        socket.on("weberror", function(err) {
            alert(err);
        })
    
        socket.on("new game", function(data) {
            console.log("connection made to a new game!");
            console.log(data);
        })
    }setup();
    
    function draw() {
      
    }setInterval(draw, opts.FPS)
})