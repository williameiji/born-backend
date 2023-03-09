import app from "./index";
import dotenv from "dotenv";
import { connectToDatabase } from "../src/databases/mongo";

dotenv.config();
connectToDatabase();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});
