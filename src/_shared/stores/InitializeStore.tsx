"use client";

import { useAuthStore } from "@/_shared/stores/auth.store";
import type { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { authService } from "@/_shared/auth/auth.service";
import { useToast } from "../hooks/use-toast";
import { httpProvider } from "../services/infrastructure/providers/http-provider";
import { useQuery } from "../adapters/QueryAdapter";

// Define the type for the user data response
interface UserResponse {
	id: string;
	email: string;
	userType: "admin" | "user" | null; // Restrict to allowed values
	session: Session;
}

export function InitializeStore() {
	const { setSession, setUserType } = useAuthStore();
	const { toast } = useToast();

	const fetchUserData = async () =>
		httpProvider.get<UserResponse>({ endpoint: "/user" });

	const { data } = useQuery<UserResponse>(["user"], fetchUserData, {
		staleTime: 5 * 60 * 1000, // 5 minutos
		cacheTime: 10 * 60 * 1000, // 10 minutos
		retry: 1,
		onError: () => {
			toast({
				title: "Erro ao buscar dados do usuário",
				description: "Por favor, tente novamente mais tarde",
				variant: "destructive",
			});
		},
	});

	const userProfile = data?.userType;
	const session = data?.session;

	useEffect(() => {
		if (userProfile) {
			setUserType(userProfile);
		}
		if (session) {
			setSession(session);
		} else {
			// Se não tiver sessão do servidor, tenta buscar do cliente
			const fetchSession = async () => {
				try {
					const { session } = await authService.getSession();
					if (session) {
						setSession(session);
					}
				} catch (error) {
					toast({
						title: "Erro ao buscar sessão",
						description: "Por favor, tente novamente mais tarde",
						variant: "destructive",
					});
				}
			};

			fetchSession();
		}
	}, [session]);

	return null;
}
