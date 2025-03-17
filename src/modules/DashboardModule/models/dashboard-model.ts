import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import type { DashboardData } from "@/app/api/dashboard/contracts";

export const dashboardModel = {
	fetchDashboardData: async (): Promise<DashboardData> => {
		return await httpProvider.get<DashboardData>({
			endpoint: "/api/dashboard",
		});
	},
};
