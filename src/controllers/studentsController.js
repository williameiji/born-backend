import * as studentService from "../services/studentService.js";

export async function newStudent(req, res) {
	const data = req.body;

	await studentService.newStudent(data);

	res.status(201).send("Cadastro efetuado com sucesso");
}

export async function findStudent(req, res) {
	const name = req.params.name;

	const data = await studentService.findStudent(name);

	res.send(data);
}

export async function editStudent(req, res) {
	const data = req.body;

	await studentService.editStudent(data);

	res.status(200).send("Dados editados com sucesso!");
}
