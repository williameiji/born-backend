import supertest from "supertest";
import app from "../../src/index";
import { userFactory } from "../factories/userFactory";
import { db, mongoClient, connectToDatabase } from "../../src/databases/mongo";

const server = supertest(app);

beforeAll(async () => {
	await connectToDatabase();
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

	it.todo("Test signup with invalid company key");

	it.todo("Test signup with invalid username");

	it.todo("Test signup with invalid password");

	it.todo("Test login with valid params");

	it.todo("Test login with invalid username");

	it.todo("Test login with invalid password");
});
