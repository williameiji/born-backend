import { faker } from "@faker-js/faker";

export async function studentFactory() {
	return {
		date: String(faker.date.recent()),
		value: faker.finance.amount(100, 200, 2),
		name: faker.name.fullName(),
		cpfStudent: faker.random.numeric(11),
		rgStudent: faker.random.numeric(7),
		nameResp: "",
		cpfResp: "",
		rgResp: "",
		adress: faker.address.street(),
		number: faker.random.numeric(3),
		district: faker.lorem.words(2),
		city: faker.address.cityName(),
		phone: faker.random.numeric(11),
		email: faker.internet.email(),
	};
}
