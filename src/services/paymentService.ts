import * as paymentRepository from "../repositories/paymentRepository";
import * as studentService from "../services/studentService";
import * as types from "../infra/utils/types";

export async function addPayment(data: types.TPayments) {
	await studentService.checkIfStudentExist(data.id);

	await paymentRepository.insert(data);
}

export async function sendPayments(id: string) {
	await studentService.checkIfStudentExist(id);

	return paymentRepository.getPayments(id);
}

export async function deletePayment(id: string) {
	await studentService.checkIfStudentExist(id);

	return paymentRepository.deletePayment(id);
}
