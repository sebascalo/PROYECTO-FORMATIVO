"use client";

import * as React from "react";
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  sharedTableFeatures,
  type SharedTableFeatures,
} from "@/components/ui/data-table-features";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<SharedTableFeatures, TData>[];
  data: TData[];
  // Nombre de la columna sobre la que se aplica el buscador de texto (opcional)
  filterColumnId?: string;
  filterPlaceholder?: string;
  // Elemento(s) que se muestran a la derecha del buscador (ej: botón "Agregar")
  toolbar?: React.ReactNode;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumnId,
  filterPlaceholder = "Filtrar...",
  toolbar,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // const table = useTable({
  //   features: sharedTableFeatures,
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   state: {
  //     sorting,
  //     columnFilters,
  //   },
  // });
  const table = useTable({
  features: sharedTableFeatures,
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  state: {
    sorting,
    columnFilters,
  },
  initialState: {
    pagination: { pageSize: 10, pageIndex: 0 },
  },
});

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.state.pagination?.pageIndex ?? 0;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-4">
      {(filterColumnId || toolbar) && (
        <div className="flex items-center justify-between gap-4">
          {filterColumnId ? (
            <Input
              placeholder={filterPlaceholder}
              value={
                (table
                  .getColumn(filterColumnId)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumnId)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-white border-[#E7E2D6] focus-visible:ring-[#4B6043]/30 focus-visible:border-[#4B6043]"
            />
          ) : (
            <div />
          )}
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#E7E2D6] bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-[#E7E2D6] bg-[#F4F2EB] hover:bg-[#F4F2EB]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 text-xs font-semibold uppercase tracking-wide text-[#6B6459]"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-[#EFEBE0] last:border-0 transition-colors hover:bg-[#F7F5EF]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 text-[#2B2A26]">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-[#6B6459]"
                >
                  No hay registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B6459]">
          {totalRows} {totalRows === 1 ? "registro" : "registros"}
          {pageCount > 1 && (
            <span>
              {" "}
              · Página {pageIndex + 1} de {pageCount}
            </span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-[#E7E2D6] text-[#2B2A26] hover:bg-[#F4F2EB] hover:text-[#2B2A26]"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-[#E7E2D6] text-[#2B2A26] hover:bg-[#F4F2EB] hover:text-[#2B2A26]"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
