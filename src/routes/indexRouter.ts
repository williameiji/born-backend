import { Router } from "express";

import authRouter from "./authRouter";
import studentsRouter from "./studentsRouter";

const router = Router();

router.use(authRouter);
router.use(studentsRouter);

export default router;
