import { getAuthToken, verifyAndRefreshTokens } from "@/_shared/lib/auth";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import type { Vehicle } from "@/app/api/vehicles/contracts";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		await verifyAndRefreshTokens();
		const searchParams = request.nextUrl.searchParams;
		const page = searchParams.get("page") || "1";
		const pageSize = searchParams.get("pageSize") || "10";
		const search = searchParams.get("search") || "";
		const status = searchParams.get("status") || "all";

		const params: Record<string, string> = {
			page,
			pageSize,
		};

		if (search) {
			params.search = search;
		}

		if (status !== "all") {
			params.status = status;
		}

		const response = await httpProvider.get<Vehicle[]>({
			endpoint: "http://ws.lifeonline.com.br:7060/api/vehicles",
			headers: {
				Authorization: `Bearer ${await getAuthToken()}`,
			},
		});

		return NextResponse.json(response);
	} catch (error) {
		console.error("Error fetching vehicles data:", error);
		return NextResponse.json({ error: "Failed to fetch vehicles data" }, { status: 500 });
	}
}
