import supertest from "supertest";
import app from "../../src/index";
import { userFactory } from "../factories/userFactory";
import { db, mongoClient, connectToDatabase } from "../../src/databases/mongo";
import { loginScenario } from "../factories/scenarioFactory";

const server = supertest(app);

beforeAll(async () => {
	await connectToDatabase();
});

beforeEach(async () => {
	await db.users.deleteMany({});
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

		expect(result.status).toBe(200);
	});

	it("Test login with invalid username", async () => {
		const data = await loginScenario();

		const result = await server.post("/login").send({ ...data, name: "teste" });

		expect(result.status).toBe(401);
	});

	it.todo("Test login with invalid password");
});
