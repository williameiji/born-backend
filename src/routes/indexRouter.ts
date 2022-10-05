import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./authRouter";
import studentsRouter from "./studentsRouter";
import e2eRouter from "./e2eRouter";

const router = Router();

router.use(authRouter);
router.use(studentsRouter);

if (process.env.MODE === "DEV") {
	router.use(e2eRouter);
}

export default router;
