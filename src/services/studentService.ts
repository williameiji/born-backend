import * as studentRepository from "../repositories/studentRepository";
import * as types from "../infra/utils/types";

export async function newStudent(data: types.Student) {
	await studentRepository.insert(data);
}

export async function findStudent(name: string) {
	const data = await studentRepository.findStudentByPartialName(name);

	return data;
}

export async function editStudent(data: types.TStudent) {
	const student = await studentRepository.findByName(data.name);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	await studentRepository.edit(student, data);
}
