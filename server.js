const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 8080;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("payment", (msg) => {
    /* socket.emit("an withevent", msg); */
    socket.broadcast.emit("payment status", msg);
  });
});
