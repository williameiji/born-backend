import * as authService from "../../src/services/authService";
import * as authRepository from "../../src/repositories/authRepository";
import * as studentService from "../../src/services/studentService";
import * as studentRepository from "../../src/repositories/studentRepository";
import * as paymentService from "../../src/services/paymentService";
import * as paymentRepository from "../../src/repositories/paymentRepository";
import { userFactory } from "../factories/userFactory";
import { studentFactory } from "../factories/studentFactory";
import { paymentFactory } from "../factories/paymentFactory";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

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
			.mockResolvedValueOnce({
				name: user.name,
				password: encryptedPassword,
			});

		const result = await authService.login(user);

		expect(findUser).toBeCalled();
		expect(typeof result).toBe("string");
	});

	it("Test login with invalid password", async () => {
		const user = await userFactory();
		delete user.key;

		const SALT = 10;

		const encryptedPassword = bcrypt.hashSync(user.password, SALT);

		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockResolvedValueOnce({
				name: user.name,
				password: encryptedPassword,
			});

		const error = authService.login({ ...user, password: "teste12345" });

		expect(findUser).toBeCalled();
		expect(error).rejects.toEqual({
			code: "Anauthorized",
			message: "Login/Senha incorretos",
		});
	});

	it("Test find user with database offline", async () => {
		const user = await userFactory();
		delete user.key;

		const findUser = jest
			.spyOn(authRepository, "findUserByName")
			.mockImplementation(() => {
				throw new Error();
			});

		const error = authService.login(user);

		expect(findUser).toBeCalled();
		expect(error).rejects.toEqual({
			code: "BadRequest",
			message: "Erro no banco de dados",
		});
	});
});

describe("Student test", () => {
	it("Test add new student", async () => {
		const student = await studentFactory();

		const insertStudent = jest
			.spyOn(studentRepository, "insert")
			.mockImplementationOnce(async () => {
				return null;
			});

		await studentService.newStudent(student);

		expect(insertStudent).toBeCalled();
	});

	it("Test find student by partial name", async () => {
		const student = await studentFactory();

		const nameToSearch = "teste";

		const findStudent = jest
			.spyOn(studentRepository, "findStudentByPartialName")
			.mockResolvedValueOnce([
				{
					_id: new ObjectId("6335ac0903185b58e03c4715"),
					...student,
				},
			]);

		const result = await studentService.findStudent(nameToSearch);

		expect(findStudent).toBeCalled();
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThanOrEqual(0);
	});

	it("Test send all students", async () => {
		const student = await studentFactory();

		const searchFor = "all";

		const findStudents = jest
			.spyOn(studentRepository, "sendAllStudents")
			.mockResolvedValueOnce([
				{ _id: new ObjectId("6335ac0903185b58e03c4715"), ...student },
			]);

		const result = await studentService.findStudent(searchFor);

		expect(findStudents).toBeCalled();
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThanOrEqual(0);
	});

	it("Test edit student information with valid params", async () => {
		const student = await studentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce({
				_id: new ObjectId("6335ac0903185b58e03c4715"),
				...student,
			});

		const edit = jest
			.spyOn(studentRepository, "edit")
			.mockImplementationOnce(async () => {});

		await studentService.editStudent({
			_id: new ObjectId("6335ac0903185b58e03c4715"),
			...student,
		});

		expect(findStudent).toBeCalled();
		expect(edit).toBeCalled();
	});

	it("Test edit student information with invalid params", async () => {
		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce(null);

		const student = await studentFactory();

		const error = studentService.editStudent({
			_id: new ObjectId("6335ac0903185b58e03c4715"),
			...student,
		});

		expect(findStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "NotFound",
			message: "Aluno não encontrado!",
		});
	});

	it("Test delete student with valid params", async () => {
		const student = await studentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce({
				...student,
				_id: new ObjectId("6335ac0903185b58e03c4715"),
			});

		const deleteStudent = jest
			.spyOn(studentRepository, "deleteStudent")
			.mockImplementationOnce(async () => {});

		const id = "1234567890";

		await studentService.deleteStudent(id);

		expect(findStudent).toBeCalled();
		expect(deleteStudent).toBeCalled();
	});

	it("Test delete student with invalid id", async () => {
		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockReturnValueOnce(null);

		const id = "1234567890";

		const error = studentService.deleteStudent(id);

		expect(findStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "NotFound",
			message: "Aluno não encontrado!",
		});
	});

	it("Test add new student with database offline", async () => {
		const student = await studentFactory();

		const newStudent = jest
			.spyOn(studentRepository, "insert")
			.mockImplementation(() => {
				throw new Error();
			});

		const error = studentService.newStudent(student);

		expect(newStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "BadRequest",
			message: "Erro no banco de dados",
		});
	});

	it("Test find student with database offline", async () => {
		const findStudent = jest
			.spyOn(studentRepository, "sendAllStudents")
			.mockImplementation(() => {
				throw new Error();
			});

		const error = studentService.findStudent("all");

		expect(findStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "BadRequest",
			message: "Erro no banco de dados",
		});
	});

	it("Test edit student with database offline", async () => {
		const student = await studentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockImplementation(() => {
				throw new Error();
			});

		const error = studentService.editStudent(student);

		expect(findStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "BadRequest",
			message: "Erro no banco de dados",
		});
	});
});

describe("Test payment service", () => {
	it("Test add new payment with valid params", async () => {
		const student = await studentFactory();
		const payment = await paymentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce({
				_id: new ObjectId("6335ac0903185b58e03c4715"),
				...student,
			});

		const insert = jest
			.spyOn(paymentRepository, "insert")
			.mockImplementationOnce(async () => {});

		await paymentService.addPayment(payment);

		expect(findStudent).toBeCalled();
		expect(insert).toBeCalled();
	});

	it("Test add new payment with invalid params", async () => {
		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockReturnValueOnce(null);

		const payment = await paymentFactory();

		const error = paymentService.addPayment(payment);

		expect(findStudent).toBeCalled();
		expect(error).rejects.toEqual({
			code: "NotFound",
			message: "Aluno não encontrado!",
		});
	});

	it("Test response from send payments", async () => {
		const student = await studentFactory();
		const payment = await paymentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce({
				_id: new ObjectId("6335ac0903185b58e03c4715"),
				...student,
			});

		const getpayments = jest
			.spyOn(paymentRepository, "getPayments")
			.mockResolvedValueOnce([
				{ _id: new ObjectId("6335ac0903185b58e03c4715"), ...payment },
			]);

		const id = "1234567890";

		const payments = await paymentService.sendPayments(id);

		expect(findStudent).toBeCalled();
		expect(getpayments).toBeCalled();
		expect(payments).toBeInstanceOf(Array);
	});

	it("Test delete payments", async () => {
		const student = await studentFactory();
		const payment = await paymentFactory();

		const findStudent = jest
			.spyOn(studentRepository, "findById")
			.mockResolvedValueOnce({
				_id: new ObjectId("6335ac0903185b58e03c4715"),
				...student,
			});

		const deletePayment = jest
			.spyOn(paymentRepository, "deletePayment")
			.mockResolvedValueOnce();

		await paymentService.deletePayment(payment.id);

		expect(findStudent).toBeCalled();
		expect(deletePayment).toBeCalled();
	});
});
