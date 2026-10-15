"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// 👇 Tipos del JOIN
export type CattleData = {
  id_Bovine: number;
  name: string;
};

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Vacunation = {
  id_vacunation: number | string;
  id_Bovine: number;
  vaccination_date: string;
  applied_dose: string;
  vaccine_lot: string;
  medicine_name: string;
  idResponsible: number;
  observations: string;
  cattleData?: CattleData | null;
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

const columnHelper = createColumnHelper<SharedTableFeatures, Vacunation>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_vacunation", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  // 👇 BOVINO con nombre
  columnHelper.accessor("cattleData", {
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
    cell: ({ getValue }) => {
      const cattle = getValue();
      return (
        <span className="font-medium text-[#2B2A26]">
          {cattle?.name ?? "Sin bovino"}
        </span>
      );
    },
  }),
  columnHelper.accessor("vaccination_date", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("applied_dose", {
    header: "Dosis",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">{getValue() || "-"}</span>
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
  // 👇 RESPONSABLE con nombre + rol
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