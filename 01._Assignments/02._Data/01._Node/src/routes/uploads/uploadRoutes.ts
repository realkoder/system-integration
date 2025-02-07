import { Router } from 'express';
import multer from "multer"; // Middleware used for handling fileuplaods
import uploadsController from '../../domains/uploads/controller/uploadsController.js';
import fs from "fs";

const router = Router();

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
const upload = multer({
    storage,
    limits: { files: 1, fileSize: 2 * 1024 * 1024 }, // bytes
    fileFilter: (req, file, cb) => {
        const allowedTypes = /csv|json|yaml|yml|text\/plain|xml/;
        const extname = allowedTypes.test(file.mimetype);
        console.log("MIMIETUPE",file.mimetype);
        if (extname) {
            return cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
        }
    }
});

// POST
router.post("/", upload.single("file"), uploadsController.uploadFile);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    } else if (err) {
        console.log("err",err);
        return res.status(500).json({ error: 'An unknown error occurred.' });
    }
    next();
});



export default router;