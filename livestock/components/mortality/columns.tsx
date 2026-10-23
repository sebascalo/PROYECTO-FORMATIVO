"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// 👇 Tipos del JOIN (Quitamos CattleData)
export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Mortality = {
  id_mortality: number;
  id_Bovine: number | null;
  dateofExit: string;
  exitReason: string;
  idResponsible: number | null;
  observations: string;
  responsibleData?: ResponsibleData | null;
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

const exitReasonStyles: Record<string, string> = {
  Venta: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Muerte: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Traslado: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Descarte: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Otro: "bg-[#2B2A26] text-white hover:bg-[#1E1D1A]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Mortality>();

export const columns = columnHelper.columns([
  // COLUMNA BOVINO (Muestra el ID)
  columnHelper.accessor("id_Bovine", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        ID BOVINO
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    // 👇 Filtro para que el buscador funcione con el número del ID
    filterFn: (row, id, value) => {
      return String(row.getValue(id)).toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span className="font-medium text-[#2B2A26]">
          {value ?? "Sin bovino"}
        </span>
      );
    },
  }),
  columnHelper.accessor("dateofExit", {
    header: "Fecha de Salida",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("exitReason", {
    header: "Motivo de Salida",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={exitReasonStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("responsibleData", {
    header: "Responsable",
    cell: ({ getValue }) => {
      const responsible = getValue();
      if (!responsible) return <span className="text-[#6B6459]">-</span>;
      return (
        <div className="flex flex-col">
          <span className="text-[#2B2A26] font-medium">
            {responsible.fullName}
          </span>
          <span className="text-xs text-[#6B6459]">{responsible.role}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>
    ),
  }),
]);