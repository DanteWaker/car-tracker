"use client";

import { Button } from "@/_shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_shared/components/ui/form";
import { Input } from "@/_shared/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useLoginForm } from "./hook";

export function LoginForm() {
	const { form, onSubmit, showPassword, setShowPassword, isLoading } = useLoginForm();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input placeholder="Enter your password" type={showPassword ? "text" : "password"} {...field} />
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOffIcon className="h-4 w-4 text-muted-foreground" />
										) : (
											<EyeIcon className="h-4 w-4 text-muted-foreground" />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<a href="/forgot-password" className="text-sm text-primary hover:underline">
						Forgot password?
					</a>
				</div>
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Logging in..." : "Log in"}
				</Button>
			</form>
		</Form>
	);
}
