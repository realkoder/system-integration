import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("THE WEBHOOK RECEIVED DATA", req.body);
  res.status(200).send({ data: "OK" });
});

app.listen(PORT, console.log("Server is running at PORT", PORT));
