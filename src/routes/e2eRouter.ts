import { Router } from "express";
import * as e2eController from "../controllers/e2eController";

const e2eRouter = Router();

e2eRouter.post("/e2e/cleardb", e2eController.clearDatabase);

export default e2eRouter;
