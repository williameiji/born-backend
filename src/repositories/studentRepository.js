import db from "../databases/mongo.js";

export async function insert(data) {
	await db.collection("students").insertOne(data);
}

export async function findStudentByPartialName(name) {
	const data = await db
		.collection("students")
		.find({ name: new RegExp(name, "i") })
		.toArray();

	return data;
}

export async function findByName(name) {
	const student = await db.collection("students").findOne({ name });

	return student;
}

export async function edit(student, data) {
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
}
