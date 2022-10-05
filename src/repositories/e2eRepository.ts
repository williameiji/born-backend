import { db } from "../databases/mongo";

export async function clearDatabase() {
	await db.students.deleteMany({});
	await db.users.deleteMany({});
}
