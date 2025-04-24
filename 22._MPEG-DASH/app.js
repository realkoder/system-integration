import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.static("public"))
app.use(express.static("videos"))

app.listen(PORT, () => console.log("Server started listening on", PORT));