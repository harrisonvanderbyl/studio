/*global
    ADSAFE, report, jslint
*/
const sea = new Sea();
const socket = io();

socket.emit('hello world', 'Hello, i am connect');
socket.emit('chat message', $('#m').val());

socket.on('chat message', function(msg) {
  
});
socket.on('hello world', function(msg) {

});

function setup() {
  
}

function draw() {
  
}

