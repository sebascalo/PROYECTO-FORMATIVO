"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/vacunation/VacunationAll)
export type Vacunation = {
  id: number | string;
  idBovine: string;
  vaccination_date: string;
  applied_dose: string;
  vaccine_lot: string;
  medicine_name: string;
  application_condition: string;
  idResponsible: string;
  observations: string;
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

// Colores por condición de aplicación
const conditionStyles: Record<string, string> = {
  Sana: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Enferma: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Gestante: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Lactante: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Recuperación: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Vacunation>();

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
        Bovino
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("vaccination_date", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("applied_dose", {
    header: "Dosis",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">
        {getValue() || "-"}
      </span>
    ),
  }),
  columnHelper.accessor("vaccine_lot", {
    header: "Lote",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("medicine_name", {
    header: "Medicamento",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("application_condition", {
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