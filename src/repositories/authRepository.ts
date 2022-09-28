import db from "../databases/mongo";

export async function findUserByName(name: string) {
	return await db.collection("users").findOne({
		name,
	});
}

export async function insert(name: string, password: string) {
	await db.collection("users").insertOne({
		name,
		password,
	});
}
