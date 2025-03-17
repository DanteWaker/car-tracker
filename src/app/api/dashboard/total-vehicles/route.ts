import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	console.log(`${process.env.BASE_URL}/dashboard/total-vehicles`);
	const response = await httpProvider.get({
		endpoint: `${process.env.BASE_URL}/dashboard/total_ativos`,
		headers: {
			Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
		},
	});
	return NextResponse.json(response);
}
