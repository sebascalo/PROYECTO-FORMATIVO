"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

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
  active: boolean; // 👈 NUEVO
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
  columnHelper.accessor("id_Bovine", {
    header: "ID Bovino",
    filterFn: (row, id, value) => {
      return String(row.getValue(id)).toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">
        {getValue() ?? "Sin bovino"}
      </span>
    ),
  }),
  columnHelper.accessor("vaccination_date", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("applied_dose", {
    header: "Dosis (ml)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <span className="text-[#2B2A26] tabular-nums">
          {value.toLowerCase().includes("ml") ? value : `${value} ml`}
        </span>
      );
    },
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
  // 👇 NUEVA COLUMNA ESTADO
  columnHelper.accessor("active", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = getValue() === true;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-[#4B6043]" : "bg-[#B0A896]"
            }`}
          />
          <span className={isActive ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </span>
      );
    },
  }),
]);