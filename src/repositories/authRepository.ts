import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";

export async function findUserByName(name: string): Promise<types.TUser> {
	return await db.users.findOne({
		name,
	});
}

export async function insert(data: types.TAuth) {
	await db.users.insertOne({
		name: data.name,
		password: data.password,
	});
}
