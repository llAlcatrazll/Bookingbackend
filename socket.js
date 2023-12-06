// const { emit } = require("process");
// const { Server } = require("socket.io");

// const io = new Server({
//   /* options */
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   // ...
//   socket.on("blog", (socket) => {
//     console.log(socket);
//   });
// });

// io.listen(3000, () => {
//   console.log("server is running");
// });
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  // ...
  socket.on("blog", (socket) => {
    // socket.emit("receive", socket);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening");
});
