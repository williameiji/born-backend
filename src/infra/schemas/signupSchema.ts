import joi from "joi";

const signupSchema = joi.object({
	name: joi.string().required(),
	password: joi.string().required(),
	key: joi.number().min(6).required(),
});

export default signupSchema;
