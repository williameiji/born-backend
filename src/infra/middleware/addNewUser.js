import db from "../../databases/mongo.js";
import bcrypt from "bcrypt";

async function addNewUser(req, res, next) {
	const { nome, password } = req.body;

	const encryptedPassword = bcrypt.hashSync(password, 10);

	await db.collection("users").insertOne({
		name: nome,
		password: encryptedPassword,
	});

	next();
}

export default addNewUser;
