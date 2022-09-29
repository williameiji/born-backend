import { userFactory } from "./userFactory";
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
