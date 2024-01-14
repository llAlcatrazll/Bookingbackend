// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// const SERVER_PORT = 3002;
// const IPADDRESS = "192.168.40.173";
// const app = express();

// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Success na siya" });
// });
// /******************************************************************************
//  * EVENT DATA
//  *
//  */
// import eventData from "./data.js";
// app.get("/event", middleware, (req, res) => {
//   res.status(200).json({
//     data: eventData,
//   });
// });

// /******************************************************************************
//  * LOGIN USER
//  *
//  */
// const SECRET =
//   "7d8ecc2e0b5f40da054ef788eecde125da322715c22ccf52f0afaf471d76c38b5e7b3c0aff7975b1b89e02f5753c986b2260fae4129ecf4adbd194ddc63b4133";
// const username = "Alcatraz";
// const password = "123";
// app.post("/login", (req, res, next) => {
//   console.log(req.body);
//   const { emailUser, passwordUser } = req.body;

//   if (emailUser !== username) {
//     const error = new Error("Invalid credential");
//     error.status = 400;
//     return next(error);
//   }
//   if (passwordUser !== password) {
//     const error = new Error("Invalid credential");
//     error.status = 400;
//     return next(error);
//   }

//   const acces_token = jwt.sign({ username: username }, SECRET);

//   res.status(200).json({ message: "Successfully login", token: acces_token });
// });

// function middleware(req, res, next) {
//   try {
//     const authHeader = req.header("authorization");
//     if (!authHeader) {
//       const error = new Error("Access denied");
//       error.status = 401;
//       next(error);
//     } else {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, SECRET);
//       next();
//     }
//   } catch (err) {
//     const error = new Error(err.message);
//     error.status = 403;
//     next(error);
//   }
// }
// app.get("/events/:id", (req, res) => {
//   console.log(req.params);
// });

// /******************************************************************************
//  * SERVER
//  *
//  */
// app.all("*", (req, res, next) => {
//   const error = new Error("404 Page not found");
//   error.status = 400;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   error.status = error.status || 500;
//   res.status(error.status).json({ message: error.message });
// });

// app.listen(SERVER_PORT, IPADDRESS, () => {
//   console.log("Server is running succesfully");
// });
