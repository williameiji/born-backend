import db from "../../Databases/mongo.js";

async function editStudentInformation(req, res, next) {
	const data = req.body;

	console.log(data);

	try {
		const student = await db
			.collection("students")
			.findOne({ name: data.name });

		if (!student) return res.sendStatus(404);

		await db.collection("students").updateOne(student, {
			$set: {
				date: data.date,
				value: data.value,
				name: data.name,
				cpfStudent: data.cpfStudent,
				rgStudent: data.rgStudent,
				nameResp: data.nameResp,
				cpfResp: data.cpfResp,
				rgResp: data.rgResp,
				adress: data.adress,
				number: data.number,
				district: data.district,
				city: data.city,
				phone: data.city,
				email: data.email,
			},
		});

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default editStudentInformation;
