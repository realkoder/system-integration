import express from "express";

const app = express();
const PORT = process.env.PORT ?? 9090;

app.use(express.json());

app.post("/hook-me-up", (req, res) => {
  console.log("WEE HAVE BEEN CALLED");
  console.log("RECEIVED BODE", req.body);

  res.send({ status: "OK" });
});

app.listen(PORT, console.log("Server started listening on port", PORT));
