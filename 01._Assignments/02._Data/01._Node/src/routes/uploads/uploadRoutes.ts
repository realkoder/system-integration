import { Router } from 'express';
import multer from "multer"; // Middleware used for handling fileuplaods
import uploadsController from '../../domains/uploads/controller/uploadsController.ts';
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
    // limits: { files: 1, fileSize: 2 * 1024 * 1024 } // bytes
    limits: { files: 1, fileSize: 2 } // bytes
});

// POST
// router.post('/', uploadsController.uploadFile);

router.post("/", upload.single("file"), uploadsController.uploadFile);

export default router;
