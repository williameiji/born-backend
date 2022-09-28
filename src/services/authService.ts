import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repositories/authRepository";

export async function login(data: { nome: string; password: string }) {
	const user = await authRepository.findUserByName(data.nome);

	if (user && bcrypt.compareSync(data.password, user.password)) {
		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.SECRET_KEY_TOKEN,
			{ expiresIn: 20 * 60 }
		);

		return token;
	} else {
		throw { code: "Anauthorized", message: "Senha incorreta" };
	}
}

export async function signup(data: { nome: string; password: string }) {
	const encryptedPassword = bcrypt.hashSync(data.password, 10);

	await authRepository.insert(data.nome, encryptedPassword);
}
