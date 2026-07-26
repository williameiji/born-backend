import { Router } from "express";
import * as studentController from "../controllers/studentsController";
import verifyToken from "../infra/validators/verifyToken";
import { validateSchema } from "../infra/middleware/schemasValidator";
import newStudentSchema from "../infra/schemas/newStudentSchema";

const studentsRouter = Router();

studentsRouter.post(
	"/students",
	verifyToken,
	validateSchema(newStudentSchema),
	studentController.newStudent
);

studentsRouter.get(
	"/students/search/:name",
	studentController.findStudent
);

// CORREÇÃO DE SEGURANÇA: Adicionada a validação de schema na edição de alunos
studentsRouter.put(
	"/students/edit",
	verifyToken,
	validateSchema(newStudentSchema),
	studentController.editStudent
);

studentsRouter.delete(
	"/students/:id",
	verifyToken,
	studentController.deleteStudent
);

export default studentsRouter;
