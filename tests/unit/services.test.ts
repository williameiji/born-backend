import * as authService from "../../src/services/authService";
import * as authRepository from "../../src/repositories/authRepository";
import { userFactory } from "../factories/userFactory";
import bcrypt from "bcrypt";

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

	it("Test signup with user already registered", async () => {
		const user = await userFactory();

		delete user.key;

		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockResolvedValue(user);

		const error = authService.signup(user);

		expect(findUser).toBeCalled();
		expect(error).rejects.toEqual({
			code: "Conflict",
			message: "Usuário já cadastrado!",
		});
	});

	it("Test signup with invalid company key", async () => {
		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockResolvedValue(null);

		const user = await userFactory();

		const error = authService.signup({ ...user, key: 654321 });

		expect(findUser).toBeCalled();
		expect(error).rejects.toEqual({
			code: "Anauthorized",
			message: "Chave da empresa incorreta",
		});
	});

	it("Test login with valid params", async () => {
		const user = await userFactory();
		delete user.key;

		const SALT = 10;

		const encryptedPassword = bcrypt.hashSync(user.password, SALT);

		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockResolvedValueOnce({ name: user.name, password: encryptedPassword });

		const result = await authService.login(user);

		expect(findUser).toBeCalled();
		expect(typeof result).toBe("string");
	});

	it.todo("Test login with invalid username");

	it.todo("Test login with invalid password");
});
