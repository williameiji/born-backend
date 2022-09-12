import db from "../../databases/mongo.js";

async function addNewStudent(req, res, next) {
	const data = req.body;

	await db.collection("students").insertOne(data);

	next();
}

export default addNewStudent;
