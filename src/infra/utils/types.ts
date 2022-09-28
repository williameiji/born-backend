import { ObjectId } from "mongodb";

export interface Signup {
	id: ObjectId;
	name: string;
	password: string;
	key: number;
}

export type TSignup = Omit<Signup, "id">;
