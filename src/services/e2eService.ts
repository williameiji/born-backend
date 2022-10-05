import * as e2eRepository from "../repositories/e2eRepository";

export async function clearDatabase() {
	await e2eRepository.clearDatabase();
}
