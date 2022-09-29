import app from "./index";
import dotenv from "dotenv";
import { connectToDatabase } from "../src/databases/mongo";

dotenv.config();
connectToDatabase();

app.listen(process.env.PORT, () => {
	console.log("Server running on port " + process.env.PORT);
});
