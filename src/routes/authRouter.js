import { Router } from "express";

import checkUser from "../infra/middleware/checkUser.js";
import { login, signup } from "../controllers/authController.js";
import addNewUser from "../infra/middleware/addNewUser.js";
import verifyToken from "../infra/validators/verifyToken.js";

const authRouter = Router();

authRouter.post("/login", checkUser, login);
authRouter.post("/signup", addNewUser, signup);

export default authRouter;
