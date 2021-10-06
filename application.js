const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let pixelUpdates = [];

console.log("Starting Helios Relay!");

// Initialize Socket.IO server
io.on("connection", function(socket) {
  console.log(socket.id + " has connected");
  socket.on("brightness", (data) => {
    console.log("Relaying brightness -> " + data);
    io.emit("brightness", data);
  }); 
});

// Initialize client webserver
app.use('/', express.static(__dirname + '/client'));

httpServer.listen(5000, function() {
	console.log("Listening on *:" + 5000);
});