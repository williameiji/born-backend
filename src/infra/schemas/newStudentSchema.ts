import joi from "joi";

const newStudent = joi.object({
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
	email: joi.string().required(),
});

export default newStudent;
