import express from "express";
import cors from "cors";
import multer from "multer"; // Middleware used for handling fileuplaods
import fs from "fs";
import { parseFile } from "./fileParserScript.js";

const app = express();
const PORT = 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});
const upload = multer({ storage });

app.use(cors());

// This allows express server to accept req.body with data of type JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ data: "hello world" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(422).send("No files were uploaded");
  }

  const uploadedFile = req.file;

  console.log("FILE", uploadedFile);

  const filePath = "./uploads/" + uploadedFile.filename;
  console.log(filePath);

  (async () => {
    const parsedData = await parseFile(filePath);
    console.log("PARSEDDATA", parsedData);
  })();


  res.send({
    fileMetaData: {
      name: uploadedFile.originalname.split(".")[0] ?? "unknown name",
      sizeInBytes: uploadedFile.size,
      mimeType: uploadedFile.mimetype,
    },
  });
});

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));
