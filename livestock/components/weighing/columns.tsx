"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/weighing/WeighingAll)
export type Weighing = {
  id: number | string;
  idBovine: string;
  weighingdate: string;
  currentweight: number;
  profitorloss: number;
  bodycondition: string;
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

// Colores por condición corporal
const bodyConditionStyles: Record<string, string> = {
  Delgado: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Normal: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Gordo: "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Weighing>();

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
    header: "Condición",
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
  columnHelper.accessor("idResponsible", {
    header: "Responsable",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue()}</span>
    ),
  }),
]);