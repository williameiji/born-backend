import * as studentRepository from "../repositories/studentRepository";
import { TStudent, Student } from "../repositories/studentRepository";

export async function newStudent(data: Student) {
	await studentRepository.insert(data);
}

export async function findStudent(name: string) {
	const data = await studentRepository.findStudentByPartialName(name);

	return data;
}

export async function editStudent(data: TStudent) {
	const student = await studentRepository.findByName(data.name);

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	await studentRepository.edit(student, data);
}
