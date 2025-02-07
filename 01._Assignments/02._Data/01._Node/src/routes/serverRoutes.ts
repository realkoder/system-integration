import { Router } from 'express';
import uploadRouter from './uploads/uploadRoutes.js';

const router = Router();

router.use('/uploads', uploadRouter);

export default router;
