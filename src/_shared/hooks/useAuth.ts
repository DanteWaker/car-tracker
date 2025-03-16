import {
	authService,
	type LoginCredentials,
} from "@/_shared/auth/auth.service";
import { useAuthStore } from "@/_shared/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export interface LoginResult {
	success: boolean;
	message: string;
}

export function useAuth() {
	const router = useRouter();
	const {
		setSession,
		setUser,
		isAuthenticated,
		user,
		session,
		refreshSession: refreshSessionStore,
	} = useAuthStore();

	// Mutation para login
	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: (credentials: LoginCredentials) =>
			authService.login(credentials),
		onSuccess: (data) => {
			setSession(data.session);
			setUser(data.user);
			toast.success("Login realizado com sucesso!");
			router.push("/dashboard");
		},
		onError: (error: unknown) => {
			const axiosError = error as AxiosError;

			if (axiosError?.response?.status === 401) {
				toast.error("Credenciais inválidas. Verifique seu email e senha.");
				return;
			}

			if (error instanceof Error) {
				toast.error(`Falha ao fazer login: ${error.message}`);
				return;
			}

			toast.error("Erro ao fazer login. Por favor, tente novamente.");
		},
	});

	// Mutation para logout
	const logoutMutation = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			setSession(null);
			setUser(null);
			toast.success("Logout realizado com sucesso!");
			router.push("/login");
		},
		onError: () => {
			toast.error("Erro ao fazer logout. Por favor, tente novamente.");
		},
	});

	// Função para atualizar a sessão sem depender do React Query
	const refreshSession = async () => {
		await refreshSessionStore();
	};

	// Função de login com tratamento de erro detalhado
	const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
		try {
			await loginMutation.mutateAsync(credentials);
			return { success: true, message: "Login realizado com sucesso" };
		} catch (error: unknown) {
			// O tratamento de erro já é feito no onError do mutation
			// Apenas retornamos o resultado para compatibilidade com a interface
			const axiosError = error as AxiosError;

			if (axiosError?.response?.status === 401) {
				return {
					success: false,
					message: "Credenciais inválidas. Verifique seu email e senha.",
				};
			}

			if (error instanceof Error) {
				return {
					success: false,
					message: `Falha ao fazer login: ${error.message}`,
				};
			}

			return {
				success: false,
				message: "Falha ao fazer login. Por favor, tente novamente.",
			};
		}
	};

	return {
		login,
		logout: logoutMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		isLoggingOut: logoutMutation.isPending,
		refreshSession,
		isAuthenticated,
		user,
		session,
	};
}
