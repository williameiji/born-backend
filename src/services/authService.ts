import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repositories/authRepository";
import * as types from "../infra/utils/types";

export async function login(data: { name: string; password: string }) {
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

export async function signup(data: types.TSignup) {
	const encryptedPassword = bcrypt.hashSync(data.password, 10);

	await authRepository.insert({ ...data, password: encryptedPassword });
}
