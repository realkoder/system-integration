import { Router } from 'express';
import uploadRouter from './uploads/uploadRoutes.js';

const router = Router();

router.use('/uploads', uploadRouter);
router.use("/users", )

export default router;
