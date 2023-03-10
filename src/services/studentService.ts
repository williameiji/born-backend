import * as studentRepository from "../repositories/studentRepository";
import * as types from "../infra/utils/types";

export async function newStudent(data: types.TNewStudent) {
	try {
		await studentRepository.insert(data);
	} catch (error) {
		throw { code: "BadRequest", message: "Erro no banco de dados" };
	}
}

export async function findStudent(name: string) {
	let data: types.TStudent[];

	try {
		if (name === "all") {
			data = await studentRepository.sendAllStudents();
		} else {
			data = await studentRepository.findStudentByPartialName(name);
		}
	} catch (error) {
		throw { code: "BadRequest", message: "Erro no banco de dados" };
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

export async function checkIfStudentExist(id: string) {
	let student: types.Student;

	try {
		student = await studentRepository.findById(id);
	} catch (error) {
		throw { code: "BadRequest", message: "Erro no banco de dados" };
	}

	if (!student) throw { code: "NotFound", message: "Aluno não encontrado!" };

	return student;
}
