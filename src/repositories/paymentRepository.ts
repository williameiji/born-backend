import { ObjectId } from "mongodb";
import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";

export async function insert(data: types.TPayments) {
	await db.payments.insertOne(data);
}

export async function getPayments(id: string) {
	return (await db.payments.find({ id }).toArray()) as types.Payments[];
}

export async function deletePayment(id: string) {
	await db.payments.deleteOne({ _id: new ObjectId(id) });
}
