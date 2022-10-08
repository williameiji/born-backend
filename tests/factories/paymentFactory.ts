import { faker } from "@faker-js/faker";

export async function paymentFactory() {
	return {
		id: faker.random.numeric(6),
		name: faker.name.firstName(),
		value: faker.finance.amount(100, 150, 2),
		date: String(faker.date.recent()),
		reference: faker.date.month(),
	};
}
