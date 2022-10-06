import { db } from "../databases/mongo";

export async function insert(data) {
	await db.payments.insertOne(data);
}
