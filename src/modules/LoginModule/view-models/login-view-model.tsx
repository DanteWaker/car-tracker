"use client";

import { useState } from "react";
import { z } from "zod";
import { useLoginModel } from "../models/login-model";

export function useLoginViewModel() {
	const { login } = useLoginModel();
	const [error, setError] = useState<string | null>(null);

	// Login schema for form validation
	const loginSchema = z.object({
		email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(1, { message: "Password is required" })
			.min(6, { message: "Password must be at least 6 characters" }),
	});

	// Handle login submission
	const handleLogin = async (data: { email: string; password: string }) => {
		try {
			setError(null);
			// This would call the actual login function from the model
			await login(data.email, data.password);
			return true;
		} catch (err) {
			setError("Invalid email or password");
			throw err;
		}
	};

	return {
		loginSchema,
		handleLogin,
		error,
	};
}
