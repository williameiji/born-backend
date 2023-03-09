import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes/indexRouter";
import errorHandler from "./infra/middleware/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

let origin = "https://born-frontend.vercel.app";

if (process.env.MODE === "DEV") {
	origin = "http://localhost:3000";
}

const corsOptions = {
	origin,
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.use(errorHandler);

export default app;
