import express from "express";

const app = express();

app.use(express.static("public"));

let clients = [];

app.get("/events/subscribe", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);

  req.on("close", () => {
    console.log("connection was CLOSED");
    clients = clients.filter((client) => client !== res);
  });
});

app.get("/events/publish", (req, res) => {
  const message = { data: "this is a message" };
  clients.forEach((client) => client.send(message));
  
  clients = [];
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
