import supertest from "supertest";
import app from "../../src/index";
import { userFactory } from "../factories/userFactory";
import { db, mongoClient, connectToDatabase } from "../../src/databases/mongo";
import {
	scenarioNewUser,
	scenarioWithStudent,
	scenarioPayment,
} from "../factories/scenarioFactory";
import { studentFactory } from "../factories/studentFactory";
import { createToken } from "../../src/services/authService";
import { paymentFactory } from "../factories/paymentFactory";

const server = supertest(app);

beforeAll(async () => {
	await connectToDatabase();
});

beforeEach(async () => {
	await db.users.deleteMany({});
	await db.students.deleteMany({});
});

afterAll(async () => {
	await mongoClient.close();
});

describe("Auth test", () => {
	it("Test signup with valid params", async () => {
		const user = await userFactory();

		const result = await server.post("/signup").send(user);

		const isCreated = await db.users.findOne({
			name: user.name,
		});

		expect(result.status).toBe(201);
		expect(isCreated).not.toBeNull();
	});

	it("Test signup with invalid company key", async () => {
		const user = await userFactory();

		const result = await server
			.post("/signup")
			.send({ ...user, key: 654321 });

		expect(result.status).toBe(401);
	});

	it("Test signup with empty username", async () => {
		const user = await userFactory();

		const result = await server.post("/signup").send({ ...user, name: "" });

		expect(result.status).toBe(422);
	});

	it("Test user conflict", async () => {
		const user = await scenarioNewUser();

		const result = await server.post("/signup").send(user);

		expect(result.status).toBe(409);
	});

	it("Test signup with empty password", async () => {
		const user = await userFactory();

		const result = await server
			.post("/signup")
			.send({ ...user, password: "" });

		expect(result.status).toBe(422);
	});

	it("Test login with valid params", async () => {
		const data = await scenarioNewUser();

		delete data.key;

		const result = await server.post("/login").send(data);
		const token = result.text;

		expect(result.status).toBe(200);
		expect(typeof token).toBe("string");
	});

	it("Test login with invalid username", async () => {
		const data = await scenarioNewUser();

		delete data.key;

		const result = await server
			.post("/login")
			.send({ ...data, name: "teste" });

		expect(result.status).toBe(401);
	});

	it("Test login with invalid password", async () => {
		const data = await scenarioNewUser();

		delete data.key;

		const result = await server
			.post("/login")
			.send({ ...data, password: "teste" });

		expect(result.status).toBe(401);
	});

	it("Test login with empty username", async () => {
		const data = await scenarioNewUser();

		const result = await server.post("/login").send({ ...data, name: "" });

		expect(result.status).toBe(422);
	});

	it("Test login with empty password", async () => {
		const data = await scenarioNewUser();

		const result = await server
			.post("/login")
			.send({ ...data, password: "" });

		expect(result.status).toBe(422);
	});

	it("Force database error on login", async () => {
		const data = await scenarioNewUser();

		delete data.key;

		await mongoClient.close();

		const result = await server.post("/login").send(data);

		await connectToDatabase();

		expect(result.status).toBe(400);
	});

	it("Force database error on signup", async () => {
		const data = await userFactory();

		await mongoClient.close();

		const result = await server.post("/signup").send(data);

		await connectToDatabase();

		expect(result.status).toBe(400);
	});
});

describe("Student test", () => {
	it("Test add new student with valid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		delete student._id;

		const result = await server
			.post("/students")
			.send(student)
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		const isCreated = await db.students.findOne({
			name: student.name,
		});

		expect(result.status).toBe(201);
		expect(isCreated).not.toBeNull();
	});

	it("Test add new student without token", async () => {
		const student = await studentFactory();

		const result = await server
			.post("/students")
			.send(student)
			.set({ authorization: "Bearer", Accept: "application/json" });

		expect(result.status).toBe(401);
	});

	it("Test add new student without send a token", async () => {
		const student = await studentFactory();

		const result = await server.post("/students").send(student);

		expect(result.status).toBe(403);
	});

	it("Test search student with partial name", async () => {
		const student = await scenarioWithStudent();

		const result = await server.get(`/students/search/${student.name}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
	});

	it("Test search all students", async () => {
		const result = await server.get("/students/search/all");

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
	});

	it("Test edit student information with valid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		expect(result.status).toBe(200);
	});

	it("Test edit student information with invalid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		delete student._id;

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		expect(result.status).toEqual(404);
	});

	it("Test edit student information without token", async () => {
		const student = await scenarioWithStudent();

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({ authorization: "Bearer", Accept: "application/json" });

		expect(result.status).toBe(401);
	});

	it("Test delete student with valid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		const result = await server.delete(`/students/${student._id}`).set({
			authorization: `Bearer ${token}`,
			Accept: "application/json",
		});

		expect(result.status).toBe(202);
	});

	it("Test delete student with invalid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		const result = await server.delete("/students/123124123124").set({
			authorization: `Bearer ${token}`,
			Accept: "application/json",
		});

		expect(result.status).toBe(404);
	});

	it("Test delete student without authorization token", async () => {
		const student = await scenarioWithStudent();

		const result = await server
			.delete(`/students/${student._id}`)
			.set({ authorization: "Bearer ", Accept: "application/json" });

		expect(result.status).toBe(401);
	});

	it("Force database error on new student", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		delete student._id;

		await mongoClient.close();

		const result = await server
			.post("/students")
			.send(student)
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		await connectToDatabase();

		expect(result.status).toBe(400);
	});

	it("Force database error to find a student", async () => {
		await mongoClient.close();

		const result = await server.get("/students/search/teste");

		await connectToDatabase();

		expect(result.status).toBe(400);
	});

	it("Force database error on edit student information", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		delete student._id;

		await mongoClient.close();

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		await connectToDatabase();

		expect(result.status).toBe(400);
	});
});

describe("Test payments", () => {
	it("Test add new payment with valid params", async () => {
		const student = await scenarioWithStudent();
		const payment = await paymentFactory();
		const token = createToken(student._id);

		const result = await server
			.post("/payments")
			.set({
				authorization: `Bearer ${token}`,
				Accept: "application/json",
			})
			.send({ ...payment, id: student._id });

		expect(result.status).toBe(201);
	});

	it("Test response from send payments", async () => {
		const student = await scenarioWithStudent();
		await scenarioPayment(student._id);

		const result = await server.get(`/payments/${student._id}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
	});
});
