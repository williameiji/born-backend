import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

export async function addPayment(req: Request, res: Response) {
	const data = req.body;

	await paymentService.addPayment(data);

	res.sendStatus(201);
}
