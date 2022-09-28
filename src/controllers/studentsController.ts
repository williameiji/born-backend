import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export async function newStudent(req: Request, res: Response) {
	const data = req.body;

	await studentService.newStudent(data);

	res.status(201).send("Cadastro efetuado com sucesso");
}

export async function findStudent(req: Request, res: Response) {
	const name = req.params.name;

	const data = await studentService.findStudent(name);

	res.send(data);
}

export async function editStudent(req: Request, res: Response) {
	const data = req.body;

	await studentService.editStudent(data);

	res.status(200).send("Dados editados com sucesso!");
}
