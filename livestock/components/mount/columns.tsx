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

export type Mount = {
  id_mount: number | string;
  id_cow: number;
  id_bull: number;
  breedingDate: string;
  serviceNumber: number;
  observations: string;
  idResponsible: number;
  cowData?: CattleData | null;
  bullData?: CattleData | null;
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

const columnHelper = createColumnHelper<SharedTableFeatures, Mount>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_mount", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  // 👇 VACA
  columnHelper.accessor("cowData", {
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
    cell: ({ getValue }) => {
      const cow = getValue();
      return (
        <span className="font-medium text-[#2B2A26]">
          {cow?.name ?? "Sin vaca"}
        </span>
      );
    },
  }),
  // 👇 TORO
  columnHelper.accessor("bullData", {
    header: "Toro",
    cell: ({ getValue }) => {
      const bull = getValue();
      return (
        <span className="font-medium text-[#2B2A26]">
          {bull?.name ?? "Sin toro"}
        </span>
      );
    },
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
  // 👇 RESPONSABLE
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