import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				console.log("credentials", credentials);
				console.log("req", req);

				if (credentials?.username === "admin" && credentials?.password === "admin") {
					return {
						id: "1",
						name: "Admin",
						email: "admin@admin.com",
					};
				}
				return null;
			},
		}),
	],
});

export { handler as GET, handler as POST };
