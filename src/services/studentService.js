import * as studentRepository from "../repositories/studentRepository.js";

export async function newStudent(data) {
	await studentRepository.insert(data);
}

export async function findStudent(name) {
	const data = await studentRepository.findStudentByPartialName(name);

	return data;
}

export async function editStudent(data) {
	const student = await studentRepository.findByName(data.name);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	await studentRepository.edit(student, data);
}
