const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let pixelUpdates = [];

console.log("Starting Helios Relay!");

// Initialize Socket.IO server
io.on("connection", function(socket) {
  console.log(socket.id + " has connected");
  socket.on("draw", (data) => {
      for (let coordinates of data) {
        pixelUpdates.push(coordinates);
      }
  }); 
});

setInterval(() => {
  if (pixelUpdates.length > 0) {
    console.log("Broadcasting " + pixelUpdates.length + " pixel updates!");
    io.emit("draw", pixelUpdates);
    pixelUpdates = [];
  }
}, 100)

// Initialize client webserver
app.use('/', express.static(__dirname + '/client'));

httpServer.listen(5000, function() {
	console.log("Listening on *:" + 5000);
});