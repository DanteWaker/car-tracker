import { API_ROUTES } from "@/_shared/constants/api-routes";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				const response = await httpProvider.post<
					{ refresh: string; access: string },
					{ username: string; password: string }
				>({
					endpoint: `${process.env.BASE_URL}${API_ROUTES.AUTH.BASE}`,
					body: {
						username: credentials?.username,
						password: credentials?.password,
					},
				});

				(await cookies()).set("accessToken", response.access);
				(await cookies()).set("refreshToken", response.refresh);

				return {
					id: credentials.username,
					name: credentials.username,
					email: credentials.username,
				};
			},
		}),
	],
});

export { handler as GET, handler as POST };
