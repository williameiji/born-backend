import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const getToken = req.headers["authorization"];
	const token = getToken?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).send("Um token é necessário para autenticação.");
	}
	try {
		jwt.verify(token, process.env.SECRET_KEY_TOKEN as string);
		next();
	} catch (err) {
		return res.status(401).send("Token inválido ou expirado.");
	}
}

export default verifyToken;
