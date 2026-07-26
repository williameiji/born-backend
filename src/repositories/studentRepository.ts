import { db } from "../databases/mongo";
import * as types from "../infra/utils/types";
import { ObjectId } from "mongodb";

export async function insert(data: types.TNewStudent) {
	await db.students.insertOne(data);
}

export async function findStudentByPartialName(name: string) {
	return await db.students.find({ name: new RegExp(name, "i") }).toArray();
}

export async function sendAllStudents() {
	return await db.students.find().toArray();
}

export async function findById(id: string): Promise<types.Student> {
	const searchId = new ObjectId(id);
	// Retornamos exatamente como types.Student para não quebrar o Service atual no deploy
	return (await db.students.findOne({ _id: searchId })) as types.Student;
}

export async function edit(student: types.TStudent, data: types.TStudent) {
	// Passamos apenas o _id e forçamos o cast como ObjectId para o compilador do TS aprovar
	const filter = { _id: student._id as ObjectId };

	await db.students.updateOne(filter, {
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
			phone: data.phone, // Correção do bug que salvava a cidade no telefone
			email: data.email,
		},
	});
}

export async function deleteStudent(id: string) {
	const studentId = new ObjectId(id);
	await db.students.deleteOne({ _id: studentId });
}
