import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

// This example is based on Socket.IO own docs: https://socket.io/docs/v4/tutorial/step-3

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New connection:", io.sockets.sockets.size);

  // event message
  socket.on("message", async (message) => {
    console.log(`Received message from the client: ${message}`);

    io.emit("message", message);
  });

  // event connection-count
  socket.on("connection-count", async (message) => {
    console.log(`Received message from the client: ${message}`);

    io.emit("connection-count", io.sockets.sockets.size);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", io.sockets.sockets.size);
  });
});

server.listen(PORT, console.log("Server listening on PORT", PORT));
