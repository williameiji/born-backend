import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as types from "../infra/utils/types";

export async function login(req: Request, res: Response) {
	const data = req.body as types.TLogin;

	const token = await authService.login(data);

	res.status(200).send(token);
}

export async function signup(req: Request, res: Response) {
	const data = req.body as types.TAuth;

	await authService.signup(data);

	res.sendStatus(201);
}

export async function initializingServer(req: Request, res: Response) {
	setTimeout(() => {
		console.log("Ok");
	}, 5000);

	res.sendStatus(200);
}
