export interface Vehicle {
	id: string;
	codigo: string;
	is_active: boolean;
	is_online: boolean;
	placa: string;
	ultima_data: string;
	ultima_latitude: string;
	ultima_longitude: string;
	ultimo_rastreamento: string;
	user: string;
}

export interface VehiclesRequest {
	page?: number;
	pageSize?: number;
	search?: string;
	status?: "active" | "inactive" | "all";
}
