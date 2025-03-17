"use client";

import { Alert, AlertDescription, AlertTitle } from "@/_shared/components/ui/alert";
import { Badge } from "@/_shared/components/ui/badge";
import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import { Input } from "@/_shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/components/ui/select";
import { Separator } from "@/_shared/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_shared/components/ui/table";
import { IconCar, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useVehiclesViewModel } from "../viewmodels/vehicles-viewmodel";

export function VehiclesView() {
	const { vehiclesData, isLoading, isError, error, refreshData, isFetching, filters, updateFilters, goToPage } =
		useVehiclesViewModel();

	if (isLoading) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Veículos</h1>
				<div className="p-4 border border-gray-200 rounded-md">
					<p>Carregando dados dos veículos...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Veículos</h1>
				<Alert variant="destructive">
					<AlertTitle>Erro ao carregar dados</AlertTitle>
					<AlertDescription>
						<p>Não foi possível carregar os dados dos veículos. Por favor, tente novamente mais tarde.</p>
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

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Veículos</h1>
				<Button variant="outline" size="sm" onClick={() => refreshData()} disabled={isFetching}>
					<IconRefresh className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
					{isFetching ? "Atualizando..." : "Atualizar dados"}
				</Button>
			</div>

			<Separator />

			<Card className="overflow-auto">
				<CardHeader>
					<CardTitle>Lista de Veículos</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">Placa</TableHead>
								<TableHead className="text-center">Codigo</TableHead>
								<TableHead className="text-center">Ultima data</TableHead>
								<TableHead className="text-center">Ultima latitude</TableHead>
								<TableHead className="text-center">ultima longitude</TableHead>
								<TableHead className="text-center">Ultimo rastreamento</TableHead>
								<TableHead className="text-center">Status</TableHead>
								<TableHead className="text-center">Conexão</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{vehiclesData?.map((vehicle) => (
								<TableRow key={vehicle.id}>
									<TableCell className="font-medium text-center">{vehicle.placa || "-"}</TableCell>
									<TableCell className="text-center">{vehicle.codigo || "-"}</TableCell>
									<TableCell className="text-center">{vehicle.ultima_data || "-"}</TableCell>
									<TableCell className="text-center">{vehicle.ultima_latitude || "-"}</TableCell>
									<TableCell className="text-center">{vehicle.ultima_longitude || "-"}</TableCell>
									<TableCell className="text-center">{vehicle.ultimo_rastreamento || "-"}</TableCell>
									<TableCell className="text-center">
										<Badge variant={vehicle.is_active ? "default" : "secondary"}>
											{vehicle.is_active ? "Ativo" : "Inativo"}
										</Badge>
									</TableCell>
									<TableCell className="text-center">
										<Badge variant={vehicle.is_online ? "default" : "outline"}>
											{vehicle.is_online ? "Online" : "Offline"}
										</Badge>
									</TableCell>
								</TableRow>
							))}
							{vehiclesData?.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-4">
										Nenhum veículo encontrado
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
