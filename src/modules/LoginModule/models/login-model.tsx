"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export interface LoginCredentials {
	email: string;
	password: string;
}

export function useLoginModel() {
	const login = async (email: string, password: string): Promise<void> => {
		console.log("login", email, password);
		signIn("credentials", {
			email,
			password,
			redirect: false,
			callbackUrl: "/",
		});
	};

	return {
		login,
	};
}
