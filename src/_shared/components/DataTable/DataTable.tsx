"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/_shared/components/ui/button";

// Tipo genérico para as colunas que aceita qualquer valor
interface DataTableProps<TData, TValue = unknown> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: boolean;
	pageSize?: number;
}

export function DataTable<TData, TValue = unknown>({
	columns,
	data,
	pagination = true,
	pageSize = 10,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
		initialState: {
			pagination: {
				pageSize,
			},
		},
	});

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b bg-muted/50">
								{headerGroup.headers.map((header) => (
									<th
										key={crypto.randomUUID()}
										className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={crypto.randomUUID()}
								className="border-b hover:bg-muted/50 transition-colors"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={crypto.randomUUID()} className="px-4 py-3 text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{pagination && (
				<div className="flex items-center justify-end space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			)}
		</div>
	);
}
