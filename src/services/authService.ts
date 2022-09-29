import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as authRepository from "../repositories/authRepository";
import * as types from "../infra/utils/types";

dotenv.config();

export async function login(data: types.TLogin) {
	const user = await authRepository.findUserByName(data.name);

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
		throw { code: "Anauthorized", message: "Login/Senha incorretos" };
	}
}

export async function signup(data: types.TAuth) {
	const SALT = 10;

	const encryptedPassword = bcrypt.hashSync(data.password, SALT);

	if (data.key === Number(process.env.COMPANY_KEY)) {
		await authRepository.insert({ ...data, password: encryptedPassword });
	} else {
		throw { code: "Anauthorized", message: "Chave da empresa incorreta" };
	}
}
