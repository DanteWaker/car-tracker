"use client";

import { Alert, AlertDescription, AlertTitle } from "@/_shared/components/ui/alert";
import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import { Separator } from "@/_shared/components/ui/separator";
import { IconCar, IconCarOff, IconRefresh } from "@tabler/icons-react";
import { useDashboardViewModel } from "../viewmodels/dashboard-viewmodel";

export function DashboardView() {
	const { dashboardData, isLoading, isError, error, refreshData, isFetching } = useDashboardViewModel();

	// Loading state
	if (isLoading) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<div className="p-4 border border-gray-200 rounded-md">
					<p>Carregando dados do dashboard...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (isError) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<Alert variant="destructive">
					<AlertTitle>Erro ao carregar dados</AlertTitle>
					<AlertDescription>
						<p>Não foi possível carregar os dados do dashboard. Por favor, tente novamente mais tarde.</p>
						<p className="text-sm mt-2">Detalhes: {error?.message}</p>
						<Button variant="outline" size="sm" className="mt-2" onClick={() => refreshData()}>
							<IconRefresh className="h-4 w-4 mr-2" />
							Tentar novamente
						</Button>
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	// Success state
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<Button variant="outline" size="sm" onClick={() => refreshData()} disabled={isFetching}>
					<IconRefresh className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
					{isFetching ? "Atualizando..." : "Atualizar dados"}
				</Button>
			</div>

			<Separator />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total de Veículos Ativos</CardTitle>
						<IconCar className="h-5 w-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{dashboardData?.total_ativos || 0}</div>
						<p className="text-xs text-muted-foreground">Veículos cadastrados e ativos no sistema</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Veículos Online</CardTitle>
						<IconCarOff className="h-5 w-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{dashboardData?.veiculos_online || 0}</div>
						<p className="text-xs text-muted-foreground">Veículos conectados neste momento</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
