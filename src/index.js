import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./Routes/indexRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
const corsOptions = {
	origin: process.env.FRONTEND_URI,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(router);

app.listen(process.env.PORT, () => {
	console.log("Server running on port " + process.env.PORT);
});
