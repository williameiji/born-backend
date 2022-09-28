import { ObjectId } from "mongodb";

export interface Auth {
	id: ObjectId;
	name: string;
	password: string;
	key: number;
}

export type TAuth = Omit<Auth, "id">;

export type TLogin = Omit<Auth, "id" | "key">;
