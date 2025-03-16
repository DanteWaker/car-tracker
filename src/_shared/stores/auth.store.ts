import { authService } from "@/_shared/auth/auth.service";
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	session: Session | null;
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	userType: "admin" | "user" | null;

	// Actions
	setSession: (session: Session | null) => void;
	setUser: (user: User | null) => void;
	setLoading: (isLoading: boolean) => void;
	signOut: () => Promise<void>;
	refreshSession: () => Promise<void>;
	setUserType: (userType: "admin" | "user" | null) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			session: null,
			user: null,
			isLoading: true,
			isAuthenticated: false,
			userType: null,
			setSession: (session) => {
				set({
					session,
					isAuthenticated: !!session,
					user: session?.user || null,
				});
			},

			setUser: (user) => {
				set({ user });
			},

			setLoading: (isLoading) => {
				set({ isLoading });
			},

			signOut: async () => {
				try {
					await authService.logout();
					set({ session: null, user: null, isAuthenticated: false });
				} catch (error) {
					console.error("Erro ao fazer logout:", error);
					throw error;
				}
			},

			refreshSession: async () => {
				try {
					set({ isLoading: true });
					const { session, user } = await authService.getSession();

					set({
						session,
						user,
						isAuthenticated: !!session,
						isLoading: false,
					});
				} catch (error) {
					console.error("Erro ao atualizar sessão:", error);
					set({ isLoading: false });
				}
			},

			setUserType: (userType) => {
				set({ userType });
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				session: state.session,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
