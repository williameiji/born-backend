import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes/indexRouter";
import errorHandler from "./infra/middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
