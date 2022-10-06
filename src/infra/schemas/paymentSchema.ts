import joi from "joi";

const paymentSchema = joi.object({
	id: joi.string().required(),
	name: joi.string().required(),
	value: joi.string().required(),
	date: joi.string().required(),
	reference: joi.string().required(),
});

export default paymentSchema;
