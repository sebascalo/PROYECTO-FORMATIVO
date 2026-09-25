"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/mount/MountAll)
export type Mount = {
  id: number | string;
  idBovine: number | string;
  bullId: number | string;
  breedingDate: string;
  serviceNumber: number;
  bovineCondition: string;
  observations: string;
  idResponsible: string;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Colores por condición de la vaca
const conditionStyles: Record<string, string> = {
  Celo: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Quieta: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Rechaza: "bg-[#A9744F] text-white hover:bg-[#94623F]",
};

// 🔧 Filtro que convierte a texto (para columnas numéricas como idBovine)
const textFilterFn = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;
  return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
};

const columnHelper = createColumnHelper<SharedTableFeatures, Mount>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("idBovine", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        Vaca
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    filterFn: textFilterFn,
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("bullId", {
    header: "Toro",
    filterFn: textFilterFn,
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("breedingDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("serviceNumber", {
    header: () => <div className="text-right">Servicio</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue() ?? "-"}</div>
    ),
  }),
  columnHelper.accessor("bovineCondition", {
    header: "Condición",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge
          className={conditionStyles[value] ?? "bg-[#8C8266] text-white"}
        >
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("idResponsible", {
    header: "Responsable",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>
    ),
  }),
]);