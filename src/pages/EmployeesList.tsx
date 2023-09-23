import Header from "@/components/header.tsx";
import NavBar from "@/components/navbar.tsx";
import {IEmployee} from "@/hooks/EmployeesContext.tsx";
import {useEmployees} from "@/hooks/useEmployees.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	getFilteredRowModel
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";

function EmployeesList() {
	const {employees, populateEmployees} = useEmployees();
	const [sortingState, setSortingState] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState<string>("")

	const columnHelper = createColumnHelper<IEmployee>()

	const columns = [
		columnHelper.accessor('firstName', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						First Name
					</Button>
				)
			},
			cell: info => info.getValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('lastName', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Last Name
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('birthDate', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Birth Date
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('startDate', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Start Date
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('street', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Street
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('city', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						City
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('state', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						State
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('zip', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Zip Code
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('department', {
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Department
					</Button>
				)
			},
			cell: info => info.renderValue(),
			footer: info => info.column.id,
		}),
	]

	const table = useReactTable<IEmployee>({
		columns,
		data: employees,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSortingState,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting: sortingState,
			globalFilter
		},
	})

	return (
		<>
			<Header/>
			<main className={"max-w-5xl mx-auto"}>
				<NavBar/>
				<section>
					<h1 className={"text-2xl font-bold"}>Employees List</h1>
					<div className={"flex flex-col"}>
						<Button onClick={() => populateEmployees()} className={"w-fit my-4"}>
							Populate database
						</Button>
						<div className="flex items-center py-4">
							<Input
								value={globalFilter ?? ''}
								onChange={e => setGlobalFilter(e.currentTarget.value)}
								className="p-2 font-lg shadow border border-block"
								placeholder="Search all columns..."
							/>
						</div>
							<Table>
								<TableHeader>
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map(header => (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</TableHead>
										))}
									</TableRow>
								))}
								</TableHeader>
								<TableBody>
								{table.getRowModel().rows.map(row => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}
								</TableBody>
							</Table>
							<div className="flex items-center justify-end space-x-2 py-4">
								<div>
									<div className="flex items-center gap-2">
										<button
											className="border rounded p-1"
											onClick={() => table.setPageIndex(0)}
											disabled={!table.getCanPreviousPage()}
										>
											{'<<'}
										</button>
										<button
											className="border rounded p-1"
											onClick={() => table.previousPage()}
											disabled={!table.getCanPreviousPage()}
										>
											{'<'}
										</button>
										<button
											className="border rounded p-1"
											onClick={() => table.nextPage()}
											disabled={!table.getCanNextPage()}
										>
											{'>'}
										</button>
										<button
											className="border rounded p-1"
											onClick={() => table.setPageIndex(table.getPageCount() - 1)}
											disabled={!table.getCanNextPage()}
										>
											{'>>'}
										</button>
										<span className="flex items-center gap-1">
											<div>Page</div>
											<strong>
												{table.getState().pagination.pageIndex + 1} of{' '}
												{table.getPageCount()}
											</strong>
										</span>
										<span className="flex items-center gap-1">
											| Go to page:
											<input
												type="number"
												defaultValue={table.getState().pagination.pageIndex + 1}
												onChange={e => {
													const page = e.target.value ? Number(e.target.value) - 1 : 0
													table.setPageIndex(page)
												}}
												className="border p-1 rounded w-16"
											/>
										</span>
										<select
											value={table.getState().pagination.pageSize}
											onChange={e => {
												table.setPageSize(Number(e.target.value))
											}}
										>
											{[10, 20, 30, 40, 50].map(pageSize => (
												<option key={pageSize} value={pageSize}>
													Show {pageSize}
												</option>
											))}
										</select>
									</div>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									Previous
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								>
									Next
								</Button>
							</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default EmployeesList;