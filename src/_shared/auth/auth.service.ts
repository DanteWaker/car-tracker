import type { Session, User } from "@supabase/supabase-js";
import api from "../services/api/api";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User | null;
	session: Session | null;
}

export const authService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await api.post<AuthResponse>("/auth/login", credentials);
		return response.data;
	},

	async logout(): Promise<{ success: boolean }> {
		const response = await api.post<{ success: boolean }>("/auth/logout");
		return response.data;
	},

	async getSession(): Promise<AuthResponse> {
		const response = await api.get<AuthResponse>("/auth/session");
		return response.data;
	},
};
