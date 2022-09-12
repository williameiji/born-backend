import * as authService from "../services/authService.js";

export async function login(req, res) {
	const data = req.body;

	const token = await authService.login(data);

	res.status(200).send(token);
}

export async function signup(req, res) {
	const data = req.body;

	await authService.signup(data);

	res.sendStatus(201);
}
