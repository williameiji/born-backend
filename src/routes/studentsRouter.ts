import { Router } from "express";

import * as studentController from "../controllers/studentsController";
import verifyToken from "../infra/validators/verifyToken";

const studentsRouter = Router();

studentsRouter.post("/students", verifyToken, studentController.newStudent);
studentsRouter.get("/students/search/:name", studentController.findStudent);
studentsRouter.put(
	"/students/edit",
	verifyToken,
	studentController.editStudent
);

export default studentsRouter;
