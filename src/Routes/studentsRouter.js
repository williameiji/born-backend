import { Router } from "express";

import addNewStudent from "../Infra/middleware/addNewStudent.js";
import {
	newStudent,
	findStudent,
	editStudent,
} from "../Controllers/studentsController.js";
import searchStudents from "../Infra/middleware/SearchStudent.js";
import editStudentInformation from "../Infra/middleware/editStudentInformation.js";
import verifyToken from "../Infra/validators/verifyToken.js";

const studentsRouter = Router();

studentsRouter.post("/signupStudents", verifyToken, addNewStudent, newStudent);
studentsRouter.get("/searchstudents/:name", searchStudents, findStudent);
studentsRouter.put("/edit", verifyToken, editStudentInformation, editStudent);

export default studentsRouter;
