import * as authService from "../../src/services/authService";
import * as authRepository from "../../src/repositories/authRepository";
import { userFactory } from "../factories/userFactory";

beforeEach(async () => {
	jest.resetAllMocks();
	jest.clearAllMocks();
});

describe("Auth test", () => {
	it("Test signup with valid params", async () => {
		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockResolvedValueOnce(null);

		const insertUser = jest
			.spyOn(authRepository, "insert")
			.mockImplementation(async () => {
				return null;
			});

		const user = await userFactory();

		await authService.signup(user);

		expect(findUser).toBeCalled();
		expect(insertUser).toBeCalled();
	});

	it.todo("Test signup with invalid company key");

	it.todo("Test signup with invalid username");

	it.todo("Test signup with invalid password");

	it.todo("Test login with valid params");

	it.todo("Test login with invalid username");

	it.todo("Test login with invalid password");
});
