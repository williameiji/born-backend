import { Router } from "express";
import verifyToken from "../infra/validators/verifyToken";
import * as paymentsController from "../controllers/paymentController";
import { validateSchema } from "../infra/middleware/schemasValidator";
import paymentSchema from "../infra/schemas/paymentSchema";

const paymentRouter = Router();

paymentRouter.post(
	"/payments",
	verifyToken,
	validateSchema(paymentSchema),
	paymentsController.addPayment
);

paymentRouter.get("/payments/:id", paymentsController.sendPayments);

export default paymentRouter;
