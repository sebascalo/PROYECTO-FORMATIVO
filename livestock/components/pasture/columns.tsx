"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/pasture/PastureAll)
export type Pasture = {
  id: number | string;
  name: string;
  extension: number;
  forageCapacity: number;
  pastureType: string;
  currentStatus: string;
  cattleEntryDate: string | null;
  cattleExitDate: string | null;
  lastChemicalApplication: string | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Sin fecha";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Colores por estado del potrero
const statusStyles: Record<string, string> = {
  Ocupado: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  "En descanso": "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Disponible: "bg-[#4B6043] text-white hover:bg-[#405539]",
};

// Colores por tipo de pastura
const pastureTypeStyles: Record<string, string> = {
  hierba: "bg-[#4B6043] text-white hover:bg-[#405539]",
  leguminosa: "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Pasture>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        Nombre
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("extension", {
    header: () => <div className="text-right">Extensión (ha)</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue()} ha</div>
    ),
  }),
  columnHelper.accessor("forageCapacity", {
    header: () => <div className="text-right">Aforo</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue()}</div>
    ),
  }),
  columnHelper.accessor("pastureType", {
    header: "Tipo de Pastura",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Badge className={pastureTypeStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("currentStatus", {
    header: "Estado Actual",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Badge className={statusStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("cattleEntryDate", {
    header: "Ingreso Ganado",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("cattleExitDate", {
    header: "Salida Ganado",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("lastChemicalApplication", {
    header: "Último Químico",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "N/A"}</span>
    ),
  }),
]);