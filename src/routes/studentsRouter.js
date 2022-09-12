import { Router } from "express";

import addNewStudent from "../infra/middleware/addNewStudent.js";
import {
	newStudent,
	findStudent,
	editStudent,
} from "../controllers/studentsController.js";
import searchStudents from "../infra/middleware/SearchStudent.js";
import editStudentInformation from "../infra/middleware/editStudentInformation.js";
import verifyToken from "../infra/validators/verifyToken.js";

const studentsRouter = Router();

studentsRouter.post("/signupStudents", verifyToken, addNewStudent, newStudent);
studentsRouter.get("/searchstudents/:name", searchStudents, findStudent);
studentsRouter.put("/edit", verifyToken, editStudentInformation, editStudent);

export default studentsRouter;
