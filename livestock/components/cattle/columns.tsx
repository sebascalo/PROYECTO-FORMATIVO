"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/cattle/CattleAll)
export type Cattle = {
  id: number | string;
  name: string;
  raze: string;
  sex: string;
  entrydate: string;
  paddock: string;
  birthdate: string;
  currentweight: number;
  classificationbytype: string;
  active: string;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Colores por clasificación, en vez del azul/rojo default de shadcn
const classificationStyles: Record<string, string> = {
  Lechero: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Carne: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  "Doble propósito": "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Cattle>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        Nombre
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("raze", {
    header: "Raza",
  }),
  columnHelper.accessor("sex", {
    header: "Sexo",
  }),
  columnHelper.accessor("entrydate", {
    header: "Fecha Ingreso",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("paddock", {
    header: "Potrero",
  }),
  columnHelper.accessor("birthdate", {
    header: "Fecha Nac.",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("currentweight", {
    header: () => <div className="text-right">Peso (kg)</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue()} kg</div>
    ),
  }),
  columnHelper.accessor("classificationbytype", {
    header: "Clasificación",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Badge
          className={classificationStyles[value] ?? "bg-[#8C8266] text-white"}
        >
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("active", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = getValue() === "Activo";
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-[#4B6043]" : "bg-[#B0A896]"
            }`}
          />
          <span className={isActive ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {getValue()}
          </span>
        </span>
      );
    },
  }),
]);
