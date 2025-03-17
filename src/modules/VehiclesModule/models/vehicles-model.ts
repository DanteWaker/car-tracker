import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import type { VehiclesRequest, VehiclesResponse } from "@/app/api/vehicles/contracts";

// Model - Responsible for data access and business logic
export const vehiclesModel = {
	// Fetch vehicles data from the API
	fetchVehicles: async (params: VehiclesRequest = {}): Promise<VehiclesResponse> => {
		return await httpProvider.get<VehiclesResponse>({
			endpoint: "/api/vehicles",
			params: params as Record<string, string>,
		});
	},

	// Fetch a single vehicle by ID
	fetchVehicleById: async (id: string) => {
		return await httpProvider.get({
			endpoint: `/api/vehicles/${id}`,
		});
	},
};
