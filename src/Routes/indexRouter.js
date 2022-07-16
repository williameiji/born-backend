import { Router } from "express";

import authRouter from "./authRouter.js";
import studentsRouter from "./studentsRouter.js";

const router = Router();

router.use(authRouter);
router.use(studentsRouter);

export default router;
