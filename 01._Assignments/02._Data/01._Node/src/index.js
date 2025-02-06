import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());

// This allows express server to accept req.body with data of type JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ data: "hello world" });
});

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));
