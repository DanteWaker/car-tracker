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
		await verifyAndRefreshTokens();

		try {
			const { total_ativos } = await httpProvider.get<ITotalAtivos>({
				endpoint: `${process.env.BASE_URL}/dashboard/total_ativos/`,
				headers: {
					Authorization: `Bearer ${await getAuthToken()}`,
				},
			});
			const { veiculos_online } = await httpProvider.get<ITotalOnline>({
				endpoint: `${process.env.BASE_URL}/dashboard/veiculos_online/`,
				headers: {
					Authorization: `Bearer ${await getAuthToken()}`,
				},
			});
			// const veiculos_online = 5;

			return NextResponse.json({ total_ativos, veiculos_online });
		} catch (error: unknown) {
			return NextResponse.json(
				{
					total_ativos: 10,
					veiculos_online: 5,
				},
				{ status: 200 },
			);
		}
	} catch (error: unknown) {
		return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
	}
}
