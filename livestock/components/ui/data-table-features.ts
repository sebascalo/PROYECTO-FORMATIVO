import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";

// Features compartidas por TODOS los DataTable de la app (cattle, users, etc).
// Lo que no se registre aquí no se incluye en el bundle final.
export const sharedTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
});

// Este tipo se pasa como primer generico a ColumnDef, Column, Table, Row, etc.
// en las columns.tsx de CUALQUIER modulo que use <DataTable />.
export type SharedTableFeatures = typeof sharedTableFeatures;
