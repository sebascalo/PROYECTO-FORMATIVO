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

export type ArtificialInsemination = {
  id_artifInse: number | string;
  id_madre: number;
  id_toro: number | null;
  inseminationDate: string;
  semenID: string;
  id_race: number;
  servicio: string;
  observations: string;
  idResponsible: number;
  active: boolean; // 👈 NUEVO
  raceData?: { name_race: string } | null;
  responsibleData?: ResponsibleData | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const columnHelper = createColumnHelper<SharedTableFeatures, ArtificialInsemination>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_madre", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        ID Madre
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    filterFn: (row, id, value) => {
      return String(row.getValue(id)).toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue() ?? "-"}</span>
    ),
  }),

  columnHelper.accessor("id_toro", {
    header: "ID Toro",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() ?? "-"}</span>
    ),
  }),

  columnHelper.accessor("inseminationDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  columnHelper.accessor("semenID", {
    header: "Código Semen",
    cell: ({ getValue }) => (
      <Badge className="bg-[#8C8266] text-white hover:bg-[#77704F]">
        {getValue() || "-"}
      </Badge>
    ),
  }),

  columnHelper.accessor("raceData", {
    header: "Raza",
    cell: ({ getValue }) => {
      const race = getValue();
      return (
        <span className="text-[#2B2A26]">{race?.name_race ?? "-"}</span>
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

  columnHelper.accessor("servicio", {
    header: "Servicio",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className="bg-[#4B6043] text-white hover:bg-[#405539]">
          {value}
        </Badge>
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