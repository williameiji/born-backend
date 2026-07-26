import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";

export async function findUserByName(name: string): Promise<types.TUser> {
	// Forçamos a saída como types.TUser para o TypeScript não reclamar da possibilidade de null
	return (await db.users.findOne({ name })) as types.TUser;
}

export async function insert(data: types.TAuth) {
	await db.users.insertOne(data);
}
