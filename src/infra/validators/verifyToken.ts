import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const getToken = req.headers["authorization"];
	const token = getToken?.replace("Bearer ", "");

	if (!token) {
		return res.status(403).send("Um token é necessario para autenticação");
	}
	try {
		jwt.verify(token, process.env.SECRET_KEY_TOKEN);
		next();
	} catch (err) {
		return res.status(401).send("Token inválido");
	}
}

export default verifyToken;
