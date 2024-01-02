/* eslint-disable no-unused-vars */
import type { User } from "next-auth";
import "next-auth/jwt";

// extending the default user type

declare module "next-auth/jwt" {
	interface JWT {}
}

declare module "next-auth" {
	interface Session {
		user: User;
	}
}
declare module "next-auth" {
	interface User {
		id: string;
		access_token: string;
		token_type: string;
		expires_at: number;
		expires_in: number;
		refresh_token: string;
		scope: string;
	}
}
