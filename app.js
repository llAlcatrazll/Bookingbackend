import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs";
import http from "http";
import { Server } from "socket.io";
import eventData from "./data.js";

const SERVER_PORT = 3002;
const IPADDRESS = "192.168.1.188";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET =
  "7d8ecc2e0b5f40da054ef788eecde125da322715c22ccf52f0afaf471d76c38b5e7b3c0aff7975b1b89e02f5753c986b2260fae4129ecf4adbd194ddc63b4133";

function middleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"].trim();
    const token = authHeader.split(" ")[1];
    if (!authHeader) {
      const error = new Error("Access denied");
      error.status = 401;
      return next(error);
    } else {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          const error = new Error("Access denied");
          error.status = 403;
          return next(error);
        }
        next();
      });
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = 403;
    next(error);
  }
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success na siya" });
});

app.get("/event", middleware, async (req, res) => {
  try {
    res.status(200).json({
      data: JSON.parse(fs.readFileSync("Data.json")),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", (req, res, next) => {
  const { emailUser, passwordUser } = req.body;

  if (emailUser !== "Alcatraz") {
    const error = new Error("Invalid credential");
    error.status = 400;
    return next(error);
  }
  if (passwordUser !== "123") {
    const error = new Error("Invalid credential");
    error.status = 400;
    return next(error);
  }

  const acces_token = jwt.sign({ username: "Alcatraz" }, SECRET);

  res.status(200).json({ message: "Successfully login", token: acces_token });
});
app.post("/writeToFile", (req, res) => {
  const data = req.body;
  console.log(data); // Log the received data
  //FOR DATA.json
  const fileData = JSON.parse(fs.readFileSync("Data.json"));
  fileData.push(data);
  fs.writeFileSync("Data.json", JSON.stringify(fileData, null, 2));
  res.sendStatus(200);
});

app.get("/events/:id", middleware, (req, res) => {
  try {
    const { id } = req.params;
    const event = eventData.find((event) => event.id === id);
    if (!event) {
      throw new Error("Event not found");
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res, next) => {
  const error = new Error("404 Page not found");
  error.status = 400;
  next(error);
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ message: err.message });
});

app.listen(SERVER_PORT, () => {
  console.log("Server is running successfully");
});

app.post("/event", middleware, (req, res) => {
  const newEvent = req.body;

  fs.readFile("./Data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const eventData = JSON.parse(data);
    eventData.push(newEvent);
    const updatedData = JSON.stringify(eventData, null, 2);

    fs.writeFile("./Data.json", updatedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).json({ message: "Data received and saved successfully" });
    });
  });
});
app.put("/event/:id", middleware, (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;
  console.log("Received ID: ", id); // Log the received ID
  console.log("Received updated event: ", updatedEvent); // Log the received updated event

  fs.readFile("./Data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let eventData = JSON.parse(data);
    const index = eventData.findIndex((event) => event.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    eventData[index] = updatedEvent;
    const updatedData = JSON.stringify(eventData, null, 2);

    fs.writeFile("./Data.json", updatedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).json({ message: "Event updated successfully" });
    });
  });
});
// DELTE FUNCTION
app.delete("/event/:id", middleware, (req, res) => {
  const { id } = req.params;

  fs.readFile("./Data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let eventData = JSON.parse(data);
    const index = eventData.findIndex((event) => event.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    eventData.splice(index, 1);
    const updatedData = JSON.stringify(eventData, null, 2);

    fs.writeFile("./Data.json", updatedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).json({ message: "Event deleted successfully" });
    });
  });
});
