import { getAuthToken, verifyAndRefreshTokens } from "@/_shared/lib/auth";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await verifyAndRefreshTokens();

	const response = await httpProvider.get({
		endpoint: `${process.env.BASE_URL}/dashboard/total_ativos`,
		headers: {
			Authorization: `Bearer ${await getAuthToken()}`,
		},
	});

	return NextResponse.json(response);
}
