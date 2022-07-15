import { Router } from "express";

import checkUser from "../Infra/middleware/checkUser.js";
import { login, signup } from "../Controllers/authController.js";
import addNewUser from "../Infra/middleware/addNewUser.js";

const authRouter = Router();

authRouter.post("/login", checkUser, login);
authRouter.post("/signup", addNewUser, signup);

export default authRouter;
