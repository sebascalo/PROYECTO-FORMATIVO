"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/milk/MilkAll)
export type Milk = {
  id: number | string;
  idBovine: number | string;
  milkingDate: string;
  shift: string;
  litersQuantity: number;
  milkQuality: string;
  observations: string;
  idResponsible: number | string;
  active: boolean;
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

// Colores por turno
const shiftStyles: Record<string, string> = {
  Mañana: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tarde: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Noche: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

// Colores por calidad
const qualityStyles: Record<string, string> = {
  Excelente: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Buena: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Regular: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Mala: "bg-[#A9744F] text-white hover:bg-[#94623F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Milk>();

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
  columnHelper.accessor("milkingDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("shift", {
    header: "Turno",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={shiftStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("litersQuantity", {
    header: () => <div className="text-right">Litros</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right tabular-nums font-medium text-[#2B2A26]">
          {value !== null && value !== undefined ? `${value} L` : "-"}
        </div>
      );
    },
  }),
  columnHelper.accessor("milkQuality", {
    header: "Calidad",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={qualityStyles[value] ?? "bg-[#8C8266] text-white"}>
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