import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("public"));

const EXPRESS_PORT = process.env.EXPRESS_PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 9090;

const server = new WebSocketServer({ port: SOCKET_PORT });

server.on("connection", (ws) => {
  console.log("New connection:", server.clients.size);

  ws.on("message", async (message) => {
    console.log(`Received message from the client: ${message}`);

    const { channel, message: receivedMessage } = JSON.parse(message);
    if (channel === "connnection-count") {
      server.clients.forEach((client) => {
        client.send(String("Connection size is: " + server.clients.size));
      });
    } else {
      server.clients.forEach((client) => {
        client.send(String(receivedMessage));
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected:", server.clients.size);
  });
});

app.listen(EXPRESS_PORT, console.log("Server listening on PORT", EXPRESS_PORT));
