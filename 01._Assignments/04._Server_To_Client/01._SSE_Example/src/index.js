import express from "express";

const app = express();

app.use(express.static("public"));

const clients = [];
app.get("/subscribe", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  clients.push(res);
  res.write("data: You have subscribed \n\n");
});

app.get("/publish", (req, res) => {
  clients.forEach((client) =>
    client.write(`data: You received this message xD \n\n`)
  );
  res.send({ data: "message emitted" });
});

app.get("/close", (req, res) => {
  clients.forEach((client) => client.end());
  res.send({ data: "connections has been closed" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server listening on", PORT));
