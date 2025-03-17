import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{ path: "/login", whenAuthenticated: "redirect" },
	{ path: "/register", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_UNAUTHENTICATED = "/login";

export default async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get("accessToken");

	if (!authToken && publicRoute) {
		return NextResponse.next();
	}

	if (!authToken && !publicRoute) {
		return NextResponse.redirect(new URL(REDIRECT_WHEN_UNAUTHENTICATED, request.url));
	}

	if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl);
	}

	if (authToken?.value) {
		const decoded = JSON.parse(Buffer.from(authToken.value.split(".")[1], "base64").toString());
		console.log(decoded);
		const isExpired = decoded.exp < Date.now() / 1000;
		if (isExpired) {
			(await cookies()).delete("accessToken");
			return NextResponse.redirect(new URL(REDIRECT_WHEN_UNAUTHENTICATED, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|robots.txt|sitemap.xml).*)"],
};
