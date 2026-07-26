import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import * as authRepository from "../repositories/authRepository";
import * as types from "../infra/utils/types";
import { AppError } from "../infra/utils/AppError"; // Importamos a nossa classe de erros

dotenv.config();

export async function login(data: types.TLogin) {
	const user = await findUserByName(data.name);

	const token = checkPassword(user, data);

	return token;
}

export async function signup(data: types.TAuth) {
	const user = await findUserByName(data.name);

	// Atualizado para usar o AppError
	if (user) throw new AppError("Conflict", "Usuário já cadastrado!");

	const encryptedPassword = encryptPassword(data.password);

	// Adicionado 'as string' no COMPANY_KEY para o TypeScript aprovar
	if (data.key === Number(process.env.COMPANY_KEY as string)) {
		await authRepository.insert({ ...data, password: encryptedPassword });
	} else {
		// Corrigido de "Anauthorized" para "Unauthorized"
		throw new AppError("Unauthorized", "Chave da empresa incorreta");
	}
}

// Alterei o primeiro parâmetro para TUser, já que é isso que o banco de dados retorna
function checkPassword(user: types.TUser, data: types.TLogin): string {
	if (user && bcrypt.compareSync(data.password, user.password)) {
		// No MongoDB o ID nativo é _id. Usamos um fallback genérico aqui
		const token = createToken((user as any)._id || user.id);

		return token;
	} else {
		// Corrigido de "Anauthorized" para "Unauthorized"
		throw new AppError("Unauthorized", "Login/Senha incorretos");
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
		// Adicionado 'as string' aqui! Era isso que estava quebrando o deploy
		process.env.SECRET_KEY_TOKEN as string,
		{ expiresIn: 60 * 60 }
	);
}

async function findUserByName(name: string): Promise<types.TUser> {
	try {
		return await authRepository.findUserByName(name);
	} catch (error) {
		throw new AppError("BadRequest", "Erro no banco de dados");
	}
}
