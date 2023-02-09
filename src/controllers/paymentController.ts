import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

export async function addPayment(req: Request, res: Response) {
	const data = req.body;

	await paymentService.addPayment(data);

	res.sendStatus(201);
}

export async function sendPayments(req: Request, res: Response) {
	const { id } = req.params;

	const payments = await paymentService.sendPayments(id);

	res.status(200).send(payments);
}

export async function deletePayment(req: Request, res: Response) {
	const { id } = req.params;

	await paymentService.deletePayment(id);

	res.sendStatus(204);
}
