import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";
import { ObjectId } from "mongodb";

export async function insert(data: types.TNewStudent) {
	await db.students.insertOne(data);
}

export async function findStudentByPartialName(name: string) {
	return await db.students.find({ name: new RegExp(name, "i") }).toArray();
}

export async function findById(id: ObjectId): Promise<types.Student> {
	const searchId = new ObjectId(id);
	return (await db.students.findOne({ _id: searchId })) as types.Student;
}

export async function edit(student: types.TStudent, data: types.TStudent) {
	await db.students.updateOne(student, {
		$set: {
			date: data.date,
			value: data.value,
			name: data.name,
			cpfStudent: data.cpfStudent,
			rgStudent: data.rgStudent,
			nameResp: data.nameResp,
			cpfResp: data.cpfResp,
			rgResp: data.rgResp,
			adress: data.adress,
			number: data.number,
			district: data.district,
			city: data.city,
			phone: data.city,
			email: data.email,
		},
	});
}
