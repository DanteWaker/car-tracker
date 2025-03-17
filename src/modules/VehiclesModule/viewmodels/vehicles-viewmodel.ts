import { useQuery } from "@/_shared/adapters/QueryAdapter";
import type { Vehicle, VehiclesRequest } from "@/app/api/vehicles/contracts";
import { useState } from "react";
import { vehiclesModel } from "../models/vehicles-model";

export function useVehiclesViewModel() {
	const [filters, setFilters] = useState<VehiclesRequest>({
		page: 1,
		pageSize: 10,
		status: "all",
		search: "",
	});

	const queryResult = useQuery<Vehicle[]>(
		["vehicles-data", filters],
		async () => await vehiclesModel.fetchVehicles(filters),
		{
			staleTime: 1000 * 30, // 30 segundos
			refetchInterval: 1000 * 30, // 30 segundos
		},
	);

	const updateFilters = (newFilters: Partial<VehiclesRequest>) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
			page: newFilters.page || (newFilters.search !== undefined || newFilters.status !== undefined ? 1 : prev.page),
		}));
	};

	const goToPage = (page: number) => {
		updateFilters({ page });
	};

	return {
		vehiclesData: queryResult.data,
		isLoading: queryResult.isLoading,
		isError: queryResult.isError,
		error: queryResult.error,
		isFetching: queryResult.isFetching,
		filters,
		refreshData: queryResult.refetch,
		updateFilters,
		goToPage,
	};
}
