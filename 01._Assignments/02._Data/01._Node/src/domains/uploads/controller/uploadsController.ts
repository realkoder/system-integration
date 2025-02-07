import fs from "fs";
import { Request, Response } from 'express';
import { parseFile } from "./fileParserScript.js";


const uploadFile = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(422).send("No files were uploaded");
        return;
    }

    const uploadedFile = req.file;

    // console.log("FILE", uploadedFile);

    const filePath = "./uploads/" + uploadedFile.filename;

    const parsedData = await parseFile(filePath);
    console.log("PARSED_DATA", parsedData);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log("File deleted successfully");
        }
    });

    res.send({
        fileMetaData: {
            name: uploadedFile.originalname.split(".")[0] ?? "unknown name",
            sizeInBytes: uploadedFile.size,
            mimeType: uploadedFile.mimetype,
        },
        fileObject: parsedData
    });
}

export default {
    uploadFile
};