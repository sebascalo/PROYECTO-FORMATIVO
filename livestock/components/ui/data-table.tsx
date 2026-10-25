"use client";

import * as React from "react";
import {
  useTable,
  type ColumnDef,
  type RowData,
  type PaginationState,
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
  filterPlaceholder?: string;
  toolbar?: React.ReactNode;
}

function getSearchableText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(getSearchableText).join(" ");
  if (typeof value === "object") {
    return Object.values(value).map(getSearchableText).join(" ");
  }
  return "";
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterPlaceholder = "Buscar en todos los campos...",
  toolbar,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useTable({
    features: sharedTableFeatures,
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: (row, _columnId, filterValue) =>
      getSearchableText(row.original)
        .toLocaleLowerCase()
        .includes(String(filterValue ?? "").trim().toLocaleLowerCase()),
    getColumnCanGlobalFilter: () => true,
    state: {
      globalFilter,
      pagination,
    },
  });

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder={filterPlaceholder}
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
            setPagination((current) => ({ ...current, pageIndex: 0 }));
          }}
          className="max-w-sm rounded-md bg-white border-[#E7E2D6] focus-visible:ring-[#4B6043]/30 focus-visible:border-[#4B6043]"
        />
        {toolbar}
      </div>

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