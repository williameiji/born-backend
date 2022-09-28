import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export interface Auth extends WithId<Document> {
	id: ObjectId;
	name: string;
	password: string;
	key: number;
}

export type TAuth = Omit<Auth, "id">;

export type TLogin = Omit<Auth, "id" | "key">;

export type TUser = Omit<Auth, "key">;
