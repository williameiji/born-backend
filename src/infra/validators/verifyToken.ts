import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.replace("Bearer ", "");

	if (!token) {
		// O padrão HTTP para falta de credenciais é o 401 (Unauthorized)
		return res.status(401).send("Um token é necessário para autenticação.");
	}

	try {
		// "as string" garante ao TypeScript que a variável de ambiente existe
		const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN as string);
		
		// Guarda a informação decifrada do token para ser usada pelos controllers, se necessário
		res.locals.user = decoded;

		next();
	} catch (err) {
		return res.status(401).send("Token inválido ou expirado.");
	}
}
