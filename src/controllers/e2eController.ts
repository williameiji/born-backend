import { Request, Response } from "express";
import * as e2eService from "../services/e2eService";

export async function clearDatabase(req: Request, res: Response) {
	await e2eService.clearDatabase();

	res.sendStatus(202);
}
