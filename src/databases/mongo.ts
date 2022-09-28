import { MongoClient, Collection, Db } from "mongodb";
import dotenv from "dotenv";

export let db: { users: Collection; students: Collection };

export async function connectToDatabase() {
	dotenv.config();

	const mongoClient: MongoClient = new MongoClient(process.env.MONGO_URI);

	try {
		await mongoClient.connect();

		const database: Db = mongoClient.db(process.env.DATABASE_NAME);

		const usersCollection: Collection = database.collection("users");

		const studentsCollection: Collection = database.collection("students");

		db = {
			users: usersCollection,
			students: studentsCollection,
		};

		console.log(`Successfully connected to database: ${database.databaseName}`);
	} catch (error) {
		console.log(error);
	}
}

connectToDatabase();
