import express from 'express';
// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

console.log("OOK", process.env)
const app = express();
const PORT = 8080;


app.listen(PORT, () => console.log("Server started on PORT: ", PORT));