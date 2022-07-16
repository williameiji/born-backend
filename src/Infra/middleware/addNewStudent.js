import db from "../../Databases/mongo.js";

async function addNewStudent(req, res, next) {
	const data = req.body;

	await db.collection("students").insertOne(data);

	next();
}

export default addNewStudent;
