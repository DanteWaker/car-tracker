import { getAuthToken, verifyAndRefreshTokens } from "@/_shared/lib/auth";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import { NextResponse } from "next/server";
import type { DashboardData } from "./contracts";

interface ITotalAtivos {
	total_ativos: number;
}

interface ITotalOnline {
	veiculos_online: number;
}

export async function GET(): Promise<NextResponse> {
	try {
		console.log("API route: Starting dashboard data fetch");
		await verifyAndRefreshTokens();

		console.log("API route: BASE_URL:", process.env.BASE_URL);
		console.log("API route: Auth token exists:", !!(await getAuthToken()));

		try {
			console.log("API route: Fetching total_ativos");
			const { total_ativos } = await httpProvider.get<ITotalAtivos>({
				endpoint: `${process.env.BASE_URL}/dashboard/total_ativos/`,
				headers: {
					Authorization: `Bearer ${await getAuthToken()}`,
				},
			});
			console.log("API route: total_ativos fetched successfully:", total_ativos);

			console.log("API route: Fetching veiculos_online");
			const { veiculos_online } = await httpProvider.get<ITotalOnline>({
				endpoint: `${process.env.BASE_URL}/dashboard/veiculos_online/`,
				headers: {
					Authorization: `Bearer ${await getAuthToken()}`,
				},
			});
			console.log("API route: veiculos_online fetched successfully:", veiculos_online);

			// const total_ativos = 10;
			// const veiculos_online = 5;

			return NextResponse.json({ total_ativos, veiculos_online });
		} catch (error: unknown) {
			console.error(
				"API route: Error fetching data from external API:",
				error instanceof Error ? error.message : String(error),
			);

			// Fallback to mock data for development
			console.log("API route: Using mock data as fallback");
			return NextResponse.json(
				{
					total_ativos: 10,
					veiculos_online: 5,
				},
				{ status: 200 },
			);
		}
	} catch (error: unknown) {
		console.error("API route: Unhandled error:", error instanceof Error ? error.message : String(error));
		return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
	}
}
