import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import * as authRepository from "../repositories/authRepository";
import * as types from "../infra/utils/types";

dotenv.config();

export async function login(data: types.TLogin) {
	const user = await authRepository.findUserByName(data.name);

	const token = checkPassword(user, data);

	return token;
}

export async function signup(data: types.TAuth) {
	const user = await authRepository.findUserByName(data.name);

	if (user) throw { code: "Conflict", message: "Usuário já cadastrado!" };

	const encryptedPassword = encryptPassword(data.password);

	if (data.key === Number(process.env.COMPANY_KEY)) {
		await authRepository.insert({ ...data, password: encryptedPassword });
	} else {
		throw { code: "Anauthorized", message: "Chave da empresa incorreta" };
	}
}

function checkPassword(user: types.TLogin, data: types.TLogin) {
	if (user && bcrypt.compareSync(data.password, user.password)) {
		const token = createToken(user.id);

		return token;
	} else {
		throw { code: "Anauthorized", message: "Login/Senha incorretos" };
	}
}

function encryptPassword(password: string) {
	const SALT = 10;

	return bcrypt.hashSync(password, SALT);
}

export function createToken(id: ObjectId) {
	return jwt.sign(
		{
			id,
		},
		process.env.SECRET_KEY_TOKEN,
		{ expiresIn: 60 * 60 }
	);
}
