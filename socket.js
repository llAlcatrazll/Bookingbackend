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
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// io.on("connection", (socket) => {
//   // ...
//   socket.on("blog", (socket) => {
//     // socket.emit("receive", socket);
//   });
// });
const emailUseradmin = "Alcatraz";
const passwordUseradmin = "123";
app.post("/login", (req, res) => {
  console.log(req.body);
  const { emailUser, passwordUser } = req.body;

  if (emailUser !== emailUseradmin) {
    console.log("Email is fine");
    res.status(404).send("Cant Find that");
    return;
  }
  res.status(200).send({ message: "You have logged in" });
});

app.listen(3000, () => {
  console.log("Server is listening");
});
