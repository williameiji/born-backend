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

export interface Student extends WithId<Document> {
	id: ObjectId;
	date: string;
	value: string;
	name: string;
	cpfStudent: string;
	rgStudent: string;
	nameResp: string;
	cpfResp: string;
	rgResp: string;
	adress: string;
	number: string;
	district: string;
	city: string;
	phone: string;
	email: string;
}

export type TStudent = Partial<Student>;
