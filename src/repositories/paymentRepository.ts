import { db } from "../databases/mongo";

export async function insert(data) {
	await db.payments.insertOne(data);
}

export async function getPayments(id: string) {
	return await db.payments.find({ id }).toArray();
}
