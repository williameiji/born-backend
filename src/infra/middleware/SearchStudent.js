import db from "../../databases/mongo.js";

async function searchStudents(req, res, next) {
	const name = req.params.name;

	try {
		const data = await db
			.collection("students")
			.find({ name: new RegExp(name, "i") })
			.toArray();

		if (data.length === 0) return res.sendStatus(404);

		res.locals.data = data;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchStudents;
