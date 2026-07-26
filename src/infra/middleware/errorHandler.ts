import { Request, Response, NextFunction } from "express";

export default function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error.code === "BadRequest") return res.status(400).send(error.message);
	if (error.code === "WrongType") return res.status(422).send(error.message);
	
	// CORRIGIDO: de "Anauthorized" para "Unauthorized"
	if (error.code === "Unauthorized") return res.status(401).send(error.message);
	
	if (error.code === "NotFound") return res.status(404).send(error.message);
	if (error.code === "Conflict") return res.status(409).send(error.message);

	// Fallback de segurança: Lida com qualquer erro não tratado previamente
	console.error(error); // Isso ajudará você a debugar no terminal (logs)
	return res.status(500).send("Internal Server Error");
}
