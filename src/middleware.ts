import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/register", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_UNAUTHENTICATED = "/login";

export default function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get("authToken");

	if (!authToken && publicRoute) {
		return NextResponse.next();
	}

	// if (!authToken && !publicRoute) {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;
	// 	return NextResponse.redirect(redirectUrl);
	// }

	// if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = "/";
	// 	return NextResponse.redirect(redirectUrl);
	// }
}
