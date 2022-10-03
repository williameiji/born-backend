import * as studentRepository from "../repositories/studentRepository";
import * as types from "../infra/utils/types";

export async function newStudent(data: types.TNewStudent) {
	await studentRepository.insert(data);
}

export async function findStudent(name: string) {
	let data: any;

	if (name === "all") {
		data = await studentRepository.sendAllStudents();
	} else {
		data = await studentRepository.findStudentByPartialName(name);
	}

	return data;
}

export async function editStudent(data: types.TNewStudent) {
	const student = await checkIfStudentExist(data._id);

	await studentRepository.edit(student, data);
}

export async function deleteStudent(id: string) {
	await checkIfStudentExist(id);

	await studentRepository.deleteStudent(id);
}

async function checkIfStudentExist(id: string) {
	const student = await studentRepository.findById(id);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	return student;
}
