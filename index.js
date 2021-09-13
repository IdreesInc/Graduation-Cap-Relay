const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

console.log("Starting Helios Relay!");

io.on("connection", function(socket) {
  socket.on("draw", (data) => {
    console.log("Draw: " + data);
    io.emit("draw", data);
  }); 
  console.log("Client connected");
});


// TODO: Ensure this is a secure setup
app.use('/', express.static(__dirname + '/client'));

httpServer.listen(5000, function() {
	console.log("Listening on *:" + 5000);
});