import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRouter";
import errorHandler from "./infra/middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
