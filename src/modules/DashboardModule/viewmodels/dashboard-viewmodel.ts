import { useQuery } from "@/_shared/adapters/QueryAdapter";
import type { DashboardData } from "@/app/api/dashboard/contracts";
import { dashboardModel } from "../models/dashboard-model";

export function useDashboardViewModel() {
	const queryResult = useQuery<DashboardData>(
		["dashboard-data"],
		async () => await dashboardModel.fetchDashboardData(),
		{
			staleTime: 1000 * 30,
			refetchInterval: 1000 * 30,
		},
	);

	return {
		dashboardData: queryResult.data,
		isLoading: queryResult.isLoading,
		isError: queryResult.isError,
		error: queryResult.error,
		isFetching: queryResult.isFetching,
		refreshData: queryResult.refetch,
	};
}
