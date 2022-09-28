import { db } from "../databases/mongo";
import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export async function insert(data: TStudent) {
	await db.students.insertOne(data);
}

export async function findStudentByPartialName(name: string) {
	return await db.students.find({ name: new RegExp(name, "i") }).toArray();
}

export async function findByName(name: string): Promise<Student> {
	return (await db.students.findOne({ name })) as Student;
}

export async function edit(student: TStudent, data: TStudent) {
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

export interface Student extends WithId<Document> {
	id: ObjectId;
	date: string;
	value: string;
	name: string;
	cpfStudent: string;
	rgStudent: string;
	nameResp: string;
	cpfResp: string;
	rgResp: string;
	adress: string;
	number: string;
	district: string;
	city: string;
	phone: string;
	email: string;
}

export type TStudent = Partial<Student>;
