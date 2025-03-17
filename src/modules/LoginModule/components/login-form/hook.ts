import { useToast } from "@/_shared/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginViewModel } from "../../view-models/login-view-model";

export function useLoginForm() {
	const { loginSchema, handleLogin } = useLoginViewModel();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			setIsLoading(true);
			await handleLogin(data);
			toast({
				title: "Login successful",
				description: "You have been logged in successfully.",
			});
		} catch (error) {
			toast({
				title: "Login failed",
				description: "Invalid email or password.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		onSubmit,
		showPassword,
		setShowPassword,
		isLoading,
	};
}
