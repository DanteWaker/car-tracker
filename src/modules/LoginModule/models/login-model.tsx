"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export interface LoginCredentials {
	username: string;
	password: string;
}

export function useLoginModel() {
	const login = async (username: string, password: string): Promise<void> => {
		try {
			const result = await signIn("credentials", {
				username,
				password,
				redirect: false,
				callbackUrl: "/",
			});

			if (result?.error) {
				throw new Error(result.error);
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return {
		login,
	};
}
