import db from "../../Databases/mongo.js";
import bcrypt from "bcrypt";

async function checkUser(req, res, next) {
	const { nome, password } = req.body;
	const data = {
		nome,
		password,
	};

	try {
		const isUserRegister = await db.collection("users").findOne({
			name: data.nome,
		});

		if (
			isUserRegister &&
			bcrypt.compareSync(data.password, isUserRegister.password)
		) {
			next();
		}
	} catch (error) {
		res.status(401).send("Usuário/senha inválidos.");
	}
}

export default checkUser;
