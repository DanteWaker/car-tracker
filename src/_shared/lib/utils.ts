import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function decodeJwt(token: string) {
	const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
	return decoded;
}
