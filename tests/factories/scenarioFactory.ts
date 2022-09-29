import { userFactory } from "./userFactory";
import { studentFactory } from "./studentFactory";
import { db } from "../../src/databases/mongo";
import bcrypt from "bcrypt";

export async function loginScenario() {
	const user = await userFactory();
	const SALT = 10;

	const encryptedPassword = bcrypt.hashSync(user.password, SALT);

	const userLogin = { name: user.name, password: encryptedPassword };

	await db.users.insertOne(userLogin);

	return {
		name: user.name,
		password: user.password,
	};
}

export async function scenarioWithStudent() {
	const student = await studentFactory();

	await db.students.insertOne(student);

	const newStudent = await db.students.findOne({ name: student.name });

	return newStudent;
}
