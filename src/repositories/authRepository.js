import db from "../databases/mongo.js";

export async function findUserByName(nome) {
	return await db.collection("users").findOne({
		name: nome,
	});
}

export async function insert(nome, password) {
	await db.collection("users").insertOne({
		name: nome,
		password,
	});
}
