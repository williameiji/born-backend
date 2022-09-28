import { Router } from "express";

import * as authController from "../controllers/authController";
import { validateSchema } from "../infra/middleware/schemasValidator";
import loginSchema from "../infra/schemas/loginSchema";
import signupSchema from "../infra/schemas/signupSchema";

const authRouter = Router();

authRouter.post("/login", validateSchema(loginSchema), authController.login);
authRouter.post("/signup", validateSchema(signupSchema), authController.signup);

export default authRouter;
