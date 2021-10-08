const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let pixelUpdates = [];
let graduationCapId = "";
let graduationCapConnected = false;

console.log("Starting Helios Relay!");

// Initialize Socket.IO server
io.on("connection", function(socket) {
  console.log(socket.id + " has connected");
  if (graduationCapConnected) {
    socket.emit("graduation-cap-connected", "Pre-existing connection");
  }

  socket.on("graduation-cap-connected", (data) => {
    console.log("Graduation cap has connected with ID " + socket.id);
    graduationCapId = socket.id;
    graduationCapConnected = true;
    io.emit("graduation-cap-connected", data);
  });

  socket.on("brightness", (data) => {
    console.log("Relaying brightness -> " + data);
    io.emit("brightness", data);
  });

  socket.on("display", (data) => {
    console.log("Relaying display override -> " + data);
    io.emit("display", data);
  });

  socket.on("relinquish", (data) => {
    console.log("Relaying relinquish control -> " + data);
    io.emit("relinquish", data);
  });

  socket.on("disconnect", () => {
    if (socket.id === graduationCapId) {
      console.log("Graduation cap has disconnected!");
      this.graduationCapId = "";
      graduationCapConnected = false;
      io.emit("graduation-cap-disconnected", "Graduation cap disconnected");
    } else {
      console.log("Client socket has disconnected!");
    }
  });
});

// Initialize client webserver
app.use('/', express.static(__dirname + '/client'));

httpServer.listen(25569, function() {
	console.log("Listening on *:" + 25569);
});