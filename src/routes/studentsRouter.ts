import { Router } from "express";

import * as studentController from "../controllers/studentsController";
import verifyToken from "../infra/validators/verifyToken";
import { validateSchema } from "../infra/middleware/schemasValidator";
import newStudent from "../infra/schemas/newStudentSchema";

const studentsRouter = Router();

studentsRouter.post(
	"/students",
	verifyToken,
	validateSchema(newStudent),
	studentController.newStudent
);
studentsRouter.get("/students/search/:name", studentController.findStudent);
studentsRouter.put(
	"/students/edit",
	verifyToken,
	studentController.editStudent
);
studentsRouter.delete(
	"/students/:id",
	verifyToken,
	studentController.deleteStudent
);

export default studentsRouter;
