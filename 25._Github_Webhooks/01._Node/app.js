import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("WE HIT");

  res.sendStatus(204);
});

app.post("/githubwebhookjson", (req, res) => {
  console.log(req.body);

  res.sendStatus(204);
});

app.post("/githubwebhookform", (req, res) => {
  console.log(req.body);

  res.sendStatus(204);
});

app.listen(PORT, () => console.log("Server listening on", PORT));
