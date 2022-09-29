import { faker } from "@faker-js/faker";

export async function userFactory() {
	return {
		name: faker.name.firstName(),
		password: faker.internet.password(),
		key: 123456,
	};
}
