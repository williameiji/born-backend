import { MongoClient, Collection, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export let db: {
	users: Collection;
	students: Collection;
	payments: Collection;
};

export let mongoClient: MongoClient;

export async function connectToDatabase() {
	mongoClient = new MongoClient(process.env.ME_CONFIG_MONGODB_URL as string);

	await mongoClient.connect();

	// Adicionado 'as string' para garantir ao TypeScript que a variável existe
	const database: Db = mongoClient.db(process.env.DATABASE_NAME as string);

	const usersCollection: Collection = database.collection(
		process.env.USERS_COLLECTION_NAME as string
	);

	const studentsCollection: Collection = database.collection(
		process.env.STUDENTS_COLLECTION_NAME as string
	);

	const paymentsCollection: Collection = database.collection(
		process.env.PAYMENTS_COLLECTION_NAME as string
	);

	db = {
		users: usersCollection,
		students: studentsCollection,
		payments: paymentsCollection,
	};
}
