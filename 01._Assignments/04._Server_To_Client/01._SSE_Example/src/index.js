import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send({ data: "Heyyy" });
});

app.listen(PORT, () => console.log("Server listening on", PORT));
