import { decodeJwt, isJwtExpired } from "@/_shared/lib/utils";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import { cookies } from "next/headers";

export async function verifyAndRefreshTokens() {
	const cookieStore = await cookies();
	const authToken = cookieStore.get("accessToken");
	const refreshToken = cookieStore.get("refreshToken");

	if (!authToken || !refreshToken) {
		return false;
	}

	const decoded = decodeJwt(authToken.value);
	const isExpired = isJwtExpired(decoded);
	const refreshTokenDecoded = decodeJwt(refreshToken.value);
	const refreshTokenIsExpired = isJwtExpired(refreshTokenDecoded);

	if (isExpired && !refreshTokenIsExpired) {
		const response = await httpProvider.post<{ access: string }, { refresh: string }>({
			endpoint: `${process.env.BASE_URL}/auth/refresh/`,
			body: { refresh: refreshToken.value },
		});
		if (response) {
			cookieStore.set("accessToken", response.access);
			console.log("dentro do if");
		}
	}

	if (isExpired && refreshTokenIsExpired) {
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");
	}
}

export async function getAuthToken() {
	return (await cookies()).get("accessToken")?.value;
}
