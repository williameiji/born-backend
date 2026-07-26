import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./authRouter";
import studentsRouter from "./studentsRouter";
import paymentRouter from "./paymentRouter";

const router = Router();

router.use(authRouter);
router.use(studentsRouter);
router.use(paymentRouter);

export default router;
