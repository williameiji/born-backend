import * as paymentRepository from "../repositories/paymentRepository";

export async function addPayment(data) {
	await paymentRepository.insert(data);
}

export async function sendPayments(id: string) {
	return paymentRepository.getPayments(id);
}
