import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface JwtPayload {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
}

export function decodeJwt(token: string): JwtPayload {
	const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
	return decoded;
}

export function isJwtExpired(decoded: JwtPayload): boolean {
	return decoded.exp < Date.now() / 1000;
}
