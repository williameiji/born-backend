import supertest from "supertest";
import app from "../../src/index";
import { userFactory } from "../factories/userFactory";
import { db, mongoClient, connectToDatabase } from "../../src/databases/mongo";
import {
	loginScenario,
	scenarioWithStudent,
} from "../factories/scenarioFactory";
import { studentFactory } from "../factories/studentFactory";
import { createToken } from "../../src/services/authService";

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

		const result = await server.post("/signup").send({ ...user, key: 654321 });

		expect(result.status).toBe(401);
	});

	it("Test signup with empty username", async () => {
		const user = await userFactory();

		const result = await server.post("/signup").send({ ...user, name: "" });

		expect(result.status).toBe(422);
	});

	it("Test signup with empty password", async () => {
		const user = await userFactory();

		const result = await server.post("/signup").send({ ...user, password: "" });

		expect(result.status).toBe(422);
	});

	it("Test login with valid params", async () => {
		const data = await loginScenario();

		const result = await server.post("/login").send(data);
		const token = result.text;

		expect(result.status).toBe(200);
		expect(typeof token).toBe("string");
	});

	it("Test login with invalid username", async () => {
		const data = await loginScenario();

		const result = await server.post("/login").send({ ...data, name: "teste" });

		expect(result.status).toBe(401);
	});

	it("Test login with invalid password", async () => {
		const data = await loginScenario();

		const result = await server
			.post("/login")
			.send({ ...data, password: "teste" });

		expect(result.status).toBe(401);
	});

	it("Test login with empty username", async () => {
		const data = await loginScenario();

		const result = await server.post("/login").send({ ...data, name: "" });

		expect(result.status).toBe(422);
	});

	it("Test login with empty password", async () => {
		const data = await loginScenario();

		const result = await server.post("/login").send({ ...data, password: "" });

		expect(result.status).toBe(422);
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
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" });

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

	it("Test search student with partial name", async () => {
		const student = await scenarioWithStudent();

		const result = await server.get(`/students/search/${student.name}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
	});

	it("Test edit student information with valid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" });

		expect(result.status).toBe(200);
	});

	it("Test edit student information with invalid params", async () => {
		const student = await scenarioWithStudent();

		const token = createToken(student._id);

		delete student._id;

		const result = await server
			.put("/students/edit")
			.send(student)
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" });

		expect(result.status).toEqual(404);
	});
});
