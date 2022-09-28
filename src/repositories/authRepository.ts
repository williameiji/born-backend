import { db } from "../databases/mongo";

export async function findUserByName(name: string) {
	return await db.users.findOne({
		name,
	});
}

export async function insert(name: string, password: string) {
	await db.users.insertOne({
		name,
		password,
	});
}
