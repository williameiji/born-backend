import * as studentRepository from "../repositories/studentRepository";
import * as types from "../infra/utils/types";
import { AppError } from "../infra/utils/AppError";

export async function newStudent(data: types.TNewStudent) {
	try {
		await studentRepository.insert(data);
	} catch (error) {
		throw new AppError("BadRequest", "Erro na base de dados ao criar aluno");
	}
}

export async function findStudent(name: string) {
	try {
		if (name === "all") {
			return await studentRepository.sendAllStudents();
		}
		return await studentRepository.findStudentByPartialName(name);
	} catch (error) {
		throw new AppError("BadRequest", "Erro na base de dados ao buscar aluno");
	}
}

// CORREÇÃO: Alterado de TNewStudent para TStudent, pois a edição exige o campo _id
export async function editStudent(data: types.TStudent) {
	if (!data._id) {
		throw new AppError("BadRequest", "O ID do aluno é obrigatório para edição.");
	}

	// Converte o _id para string de modo a passar pela verificação da função abaixo
	const student = await checkIfStudentExist(data._id.toString());

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
		throw new AppError("BadRequest", "Erro na base de dados ao validar aluno");
	}

	if (!student) {
		throw new AppError("NotFound", "Aluno não encontrado!");
	}

	return student;
}
