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

			console.log("Resultado do login:", result);

			if (result?.error) {
				console.error("Erro na autenticação:", result.error);
				throw new Error(result.error);
			}
		} catch (error) {
			console.error("Falha ao fazer login:", error);
			throw error;
		}
	};

	return {
		login,
	};
}
