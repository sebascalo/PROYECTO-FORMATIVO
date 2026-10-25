"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export type Weighing = {
  id_weighing: number | string;
  id_Bovine: string;
  weighingdate: string;
  currentweight: number;
  profitorloss: number;
  bodycondition: string;
  observations: string;
  idResponsible: number | null;
  active: boolean; // 👈 NUEVO
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

const bodyConditionStyles: Record<string, string> = {
  "1 - Flaco": "bg-[#A9744F] text-white hover:bg-[#94623F]",
  "2 - Delgado": "bg-[#8C8266] text-white hover:bg-[#77704F]",
  "3 - Ideal": "bg-[#4B6043] text-white hover:bg-[#405539]",
  "4 - Gordo": "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  "5 - Obeso": "bg-[#2B2A26] text-white hover:bg-[#1E1D1A]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Weighing>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_Bovine", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        ID Bovino
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("weighingdate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("currentweight", {
    header: () => <div className="text-right">Peso (kg)</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue()} kg</div>
    ),
  }),
  columnHelper.accessor("profitorloss", {
    header: () => <div className="text-right">Ganancia/Pérdida</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      const isPositive = value > 0;
      const isNegative = value < 0;
      return (
        <div
          className={`text-right tabular-nums font-medium ${
            isPositive
              ? "text-[#4B6043]"
              : isNegative
                ? "text-[#A9744F]"
                : "text-[#6B6459]"
          }`}
        >
          {isPositive ? "+" : ""}
          {value} kg
        </div>
      );
    },
  }),
  columnHelper.accessor("bodycondition", {
    header: "Condición Corporal",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Badge
          className={bodyConditionStyles[value] ?? "bg-[#8C8266] text-white"}
        >
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