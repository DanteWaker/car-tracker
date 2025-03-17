"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import Link from "next/link";
import { LoginForm } from "../components/login-form";

export function LoginView() {
	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>Enter your credentials to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
					<div className="mt-4 text-center text-sm">
						Don't have an account?{" "}
						<Link href="/register" className="text-primary hover:underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
