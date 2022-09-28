import { Router } from "express";

import * as studentController from "../controllers/studentsController";
import verifyToken from "../infra/validators/verifyToken";

const studentsRouter = Router();

studentsRouter.post(
	"/signupStudents",
	verifyToken,
	studentController.newStudent
);
studentsRouter.get("/searchstudents/:name", studentController.findStudent);
studentsRouter.put("/edit", verifyToken, studentController.editStudent);

export default studentsRouter;
