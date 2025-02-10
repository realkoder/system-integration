import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Import node-fetch

import ServerRoutes from './routes/serverRoutes.js';

const app = express();
const PORT = 8080;

app.use(cors());

// This allows express server to accept req.body with data of type JSON
app.use(express.json());

app.use('/api/v1', ServerRoutes);

app.get('/fetch-python', (req, res) => {
  fetch('http://python-api-file-upload:8000/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.error('Error fetching from Python API:', error);
      res.status(500).send('Error fetching from Python API');
    });
});

app.get("/", (req, res) => {
  res.send({ data: "hello world from nodejs-server" });
});

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));
