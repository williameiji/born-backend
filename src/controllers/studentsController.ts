import { Request, Response } from "express";
import * as studentService from "../services/studentService";
import * as types from "../infra/utils/types";

export async function newStudent(req: Request, res: Response) {
	const data: types.TNewStudent = req.body;

	await studentService.newStudent(data);

	return res.status(201).send("Cadastro efetuado com sucesso");
}

export async function findStudent(req: Request, res: Response) {
	const { name } = req.params;

	const data = await studentService.findStudent(name);

	return res.status(200).send(data);
}

export async function editStudent(req: Request, res: Response) {
	const data: types.TStudent = req.body;

	await studentService.editStudent(data);

	return res.status(200).send("Dados editados com sucesso!");
}

export async function deleteStudent(req: Request, res: Response) {
	const { id } = req.params;

	await studentService.deleteStudent(id);

	return res.status(202).send("Aluno removido com sucesso!");
}
