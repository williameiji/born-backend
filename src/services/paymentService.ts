import * as paymentRepository from "../repositories/paymentRepository";

export async function addPayment(data) {
	await paymentRepository.insert(data);
}
