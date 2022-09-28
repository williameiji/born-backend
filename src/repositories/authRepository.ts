import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";

export async function findUserByName(name: string) {
	return await db.users.findOne({
		name,
	});
}

export async function insert(data: types.TSignup) {
	await db.users.insertOne({
		data,
	});
}
