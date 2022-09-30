import * as studentRepository from "../repositories/studentRepository";
import * as types from "../infra/utils/types";

export async function newStudent(data: types.TNewStudent) {
	await studentRepository.insert(data);
}

export async function findStudent(name: string) {
	const data = await studentRepository.findStudentByPartialName(name);

	return data;
}

export async function editStudent(data: types.TNewStudent) {
	const student = await studentRepository.findById(data._id);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	await studentRepository.edit(student, data);
}

export async function deleteStudent(id: string) {
	const student = await studentRepository.findById(id);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	await studentRepository.deleteStudent(id);
}
