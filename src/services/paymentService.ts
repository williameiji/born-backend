import * as paymentRepository from "../repositories/paymentRepository";
import * as types from "../infra/utils/types";

export async function addPayment(data: types.TPayments) {
	await paymentRepository.insert(data);
}

export async function sendPayments(id: string) {
	return paymentRepository.getPayments(id);
}
