"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_shared/components/ui/table";
import { IconAlertTriangle, IconCalendarEvent, IconCar, IconCarOff, IconGauge, IconRoute } from "@tabler/icons-react";
import { useState } from "react";

interface DashboardData {
	totalAtivos: number;
	veiculosOnline: number;
	veiculosEmRota: number;
	alertasAtivos: number;
	distanciaPercorrida: number;
}

// Dados mockados para o dashboard
const mockData: DashboardData = {
	totalAtivos: 1,
	veiculosOnline: 0,
	veiculosEmRota: 0,
	alertasAtivos: 0,
	distanciaPercorrida: 0,
};

export function DashboardModule() {
	const [data] = useState<DashboardData>(mockData);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<div className="grid grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total de Veículos Ativos</CardTitle>
						<IconCar className="h-5 w-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{data.totalAtivos}</div>
						<p className="text-xs text-muted-foreground">Veículos cadastrados e ativos no sistema</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Veículos Online</CardTitle>
						<IconCarOff className="h-5 w-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{data.veiculosOnline}</div>
						<p className="text-xs text-muted-foreground">Veículos conectados neste momento</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
