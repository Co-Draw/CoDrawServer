import express from "express";
import configService from "./config/config.service";
import { Server, Socket } from "socket.io";
import http from "http";

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

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);
  connectedClients.set(socket.id, socket);

  socket.on("color", (data) => {
    socket.broadcast.emit("onColor", data);
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("onDraw", data);
  });

  socket.on("eraser", (data) => {
    socket.broadcast.emit("onEraser", data);
  });

  socket.on("rectangle", (data) => {
    socket.broadcast.emit("onRectangle", data);
  });

  socket.on("disconnect", () => {
    connectedClients.delete(socket.id);
    console.log(`disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
