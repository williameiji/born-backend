import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../utils/AppError";

export function validateSchema(schema: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		// abortEarly: false faz com que o Joi recolha todos os erros em vez de parar no primeiro
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			// Mapeamos os erros para devolver ao cliente exatamente o que falhou (ex: "email" is required)
			const errorMessage = error.details.map((detail) => detail.message).join(", ");
			
			throw new AppError("WrongType", errorMessage);
		}

		next();
	};
}
