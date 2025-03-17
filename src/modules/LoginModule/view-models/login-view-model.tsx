"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useLoginModel } from "../models/login-model";

export function useLoginViewModel() {
	const { login } = useLoginModel();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	// Login schema for form validation
	const loginSchema = z.object({
		username: z
			.string()
			.min(5, { message: "User is required" })
			.max(20, { message: "User must be less than 20 characters" }),
		password: z
			.string()
			.min(6, { message: "Password is required" })
			.max(36, { message: "Password must be less than 20 characters" }),
	});

	// Handle login submission
	const handleLogin = async (data: { username: string; password: string }) => {
		try {
			setError(null);
			await login(data.username, data.password);
			router.push("/");
			return true;
		} catch (err) {
			setError("Invalid user or password");
			throw err;
		}
	};

	return {
		loginSchema,
		handleLogin,
		error,
	};
}
