import express from "express";
import configService from "./config/config.service";
import { Server, Socket } from "socket.io";
import http from "http";
import Event from "./interfaces/event.interface";

const app = express();
const port: number = Number(configService.port);
const allowedOrigins: string[] = configService.cors.allowedOrigins;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});

const connectedClients = new Map<string, Socket>();
let events: Event[] = [];

io.on("connection", (socket) => {
  if (!connectedClients.has(socket.id)) {
    connectedClients.set(socket.id, socket);
    events.forEach((e) => socket.emit(e.name, e.data));
  }

  socket.on("draw", (data) => {
    events.push({ name: "onDraw", data });
    socket.broadcast.emit("onDraw", data);
  });

  socket.on("rectangle", (data) => {
    events.push({ name: "onRectangle", data });
    socket.broadcast.emit("onRectangle", data);
  });

  socket.on("circle", (data) => {
    events.push({ name: "onCircle", data });
    socket.broadcast.emit("onCircle", data);
  });

  socket.on("ellipse", (data) => {
    events.push({ name: "onEllipse", data });
    socket.broadcast.emit("onEllipse", data);
  });

  socket.on("clear", (data) => {
    events = [];
    socket.broadcast.emit("onClear", data);
  });

  socket.on("disconnect", () => {
    connectedClients.delete(socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Ok");
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
