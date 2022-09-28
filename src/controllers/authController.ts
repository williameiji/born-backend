import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function login(req: Request, res: Response) {
	const data = req.body;

	const token = await authService.login(data);

	console.log(token);

	res.status(200).send(token);
}

export async function signup(req: Request, res: Response) {
	const data = req.body;

	await authService.signup(data);

	res.sendStatus(201);
}
