import { MongoClient, Collection, Db } from "mongodb";
import dotenv from "dotenv";

export let db: { users: Collection; students: Collection };

export let mongoClient: MongoClient;

export async function connectToDatabase() {
	dotenv.config();

	mongoClient = new MongoClient(process.env.MONGO_URI);

	await mongoClient.connect();

	const database: Db = mongoClient.db(process.env.DATABASE_NAME);

	const usersCollection: Collection = database.collection("users");

	const studentsCollection: Collection = database.collection("students");

	db = {
		users: usersCollection,
		students: studentsCollection,
	};
}

// connectToDatabase();
