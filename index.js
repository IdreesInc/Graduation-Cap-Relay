const io = require("socket.io")(5000);

console.log("Starting Helios Relay!");

io.on("connection", function(socket) {
  console.log("Client connected");
  socket.emit("message", {"text": "I love you."});
});