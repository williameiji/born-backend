import { userFactory } from "./userFactory";
import { studentFactory } from "./studentFactory";
import { db } from "../../src/databases/mongo";
import bcrypt from "bcrypt";
import { paymentFactory } from "./paymentFactory";

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

export async function scenarioPayment(id) {
	const payment = await paymentFactory();

	await db.payments.insertOne({ ...payment, id });
}

//test workflow on github
