import joi from "joi";

const newStudent = joi.object({
	// Permite que o _id passe na validação, essencial para a rota de edição funcionar
	_id: joi.any(), 
	
	date: joi.string().required(),
	value: joi.string().required(),
	name: joi.string().required(),
	cpfStudent: joi.string().required(),
	rgStudent: joi.string().required(),
	nameResp: joi.string().allow(""),
	cpfResp: joi.string().allow(""),
	rgResp: joi.string().allow(""),
	adress: joi.string().allow(""),
	number: joi.string().allow(""),
	district: joi.string().allow(""),
	city: joi.string().allow(""),
	phone: joi.string().allow(""),
	
	// .email() garante que o utilizador não envie "abc" em vez de "abc@email.com"
	email: joi.string().email().required(), 
});

export default newStudent;
