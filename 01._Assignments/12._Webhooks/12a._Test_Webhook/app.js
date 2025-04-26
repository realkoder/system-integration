import express from "express";

const app = express();
const PORT = process.env.PORT ?? 9090;

app.use(express.json());

app.post("/my-webhook-url", (req, res) => {
  const payload = req.body;
  
  // Your logic making use of paymentPayload
  console.log("RECEIVED PAYLOAD", payload);

  res.status(200).send({ status: "ok" });
});

app.listen(PORT, console.log("Server started listening on port", PORT));
