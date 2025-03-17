import { getAuthToken, verifyAndRefreshTokens } from "@/_shared/lib/auth";
import { httpProvider } from "@/_shared/services/infrastructure/providers/http-provider";
import type { Vehicle, VehicleUpdateInput } from "@/app/api/vehicles/contracts";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		await verifyAndRefreshTokens();
		const { id } = params;

		const token = await getAuthToken();
		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const response = await httpProvider.get<Vehicle>({
			endpoint: `http://ws.lifeonline.com.br:7060/api/vehicles/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response) {
			return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error(`Error fetching vehicle with ID ${params.id}:`, error);
		return NextResponse.json({ error: "Failed to fetch vehicle data" }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		await verifyAndRefreshTokens();
		const { id } = params;
		const body = await request.json();

		const token = await getAuthToken();
		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const response = await httpProvider.put<Vehicle, VehicleUpdateInput>({
			endpoint: `http://ws.lifeonline.com.br:7060/api/vehicles/${id}`,
			body: { id, ...body },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return NextResponse.json(response);
	} catch (error) {
		console.error(`Error updating vehicle with ID ${params.id}:`, error);
		return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		await verifyAndRefreshTokens();
		const { id } = params;

		const token = await getAuthToken();
		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await httpProvider.del({
			endpoint: `http://ws.lifeonline.com.br:7060/api/vehicles/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(`Error deleting vehicle with ID ${params.id}:`, error);
		return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
	}
}
