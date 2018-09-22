$(function() {
    const sea = new Sea();
    const socket = io();
    
    setInterval(function() {
        socket.emit('pingoid', Date.now());
    }, 3000);
    socket.on('pongoid', function(msg) {
        let latency = Date.now() - msg;
        $("#ping-holder").text("Ping: " + latency);
    });
    
    function setup() {
      
    }
    
    function draw() {
      
    }
})