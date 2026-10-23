"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Treatment = {
  id_treatment: number | string;
  id_Bovine: number;
  treatment_date: string;
  medication_used: string;
  vaccine_lot: string; // 👈 NUEVO
  applied_dose: string;
  application_route: string;
  associated_diagnosis: string;
  treatment_duration: string;
  withdrawal_time: string; // 👈 NUEVO
  observations: string;
  idResponsible: number;
  responsibleData?: ResponsibleData | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
};

const routeStyles: Record<string, string> = {
  Oral: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Intramuscular: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Intravenosa: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tópica: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Subcutánea: "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Treatment>();

export const columns = columnHelper.columns([
  // ❌ COLUMNA ID ELIMINADA

  // 👇 ID BOVINO
  columnHelper.accessor("id_Bovine", {
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]">
        ID Bovino <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    filterFn: (row, id, value) => String(row.getValue(id)).toLowerCase().includes(value.toLowerCase()),
    cell: ({ getValue }) => <span className="font-medium text-[#2B2A26]">{getValue()}</span>,
  }),

  columnHelper.accessor("treatment_date", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  // 👇 MEDICAMENTO Y LOTE
  columnHelper.accessor("medication_used", {
    header: "Medicamento",
    cell: ({ getValue }) => <span className="text-[#2B2A26]">{getValue() || "-"}</span>,
  }),
  columnHelper.accessor("vaccine_lot", {
    header: "Lote",
    cell: ({ getValue }) => <span className="text-[#6B6459]">{getValue() || "-"}</span>,
  }),

  // 👇 DOSIS (ML)
  columnHelper.accessor("applied_dose", {
    header: "Dosis (ml)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#2B2A26] tabular-nums">{value.toLowerCase().includes("ml") ? value : `${value} ml`}</span>;
    },
  }),

  columnHelper.accessor("application_route", {
    header: "Vía",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <Badge className={routeStyles[value] ?? "bg-[#8C8266] text-white"}>{value}</Badge>;
    },
  }),

  columnHelper.accessor("associated_diagnosis", {
    header: "Diagnóstico",
    cell: ({ getValue }) => <span className="text-[#6B6459]">{getValue() || "-"}</span>,
  }),

  // 👇 DURACIÓN Y TIEMPO DE RETIRO
  columnHelper.accessor("treatment_duration", {
    header: "Duración (días)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#6B6459]">{value.toLowerCase().includes("día") ? value : `${value} días`}</span>;
    },
  }),
  columnHelper.accessor("withdrawal_time", {
    header: "T. Retiro (días)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#6B6459]">{value.toLowerCase().includes("día") ? value : `${value} días`}</span>;
    },
  }),

  columnHelper.accessor("responsibleData", {
    header: "Responsable",
    cell: ({ getValue }) => {
      const responsible = getValue();
      if (!responsible) return <span className="text-[#6B6459]">-</span>;
      return (
        <div className="flex flex-col">
          <span className="text-[#2B2A26] font-medium">{responsible.fullName}</span>
          <span className="text-xs text-[#6B6459]">{responsible.role}</span>
        </div>
      );
    },
  }),

  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>,
  }),
]);