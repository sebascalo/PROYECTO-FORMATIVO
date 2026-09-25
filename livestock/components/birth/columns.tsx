"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/birth/BirthAll)
export type Birth = {
  id: number | string;
  motheridentification: string;
  landidentification: string;
  birthdate: string;
  sex: string;
  race: string;
  birthweight: number;
  conditionatbirth: string;
  observations: string;
  responsible: string;
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

// Colores por condición al nacer
const conditionStyles: Record<string, string> = {
  Sano: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Debil: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Prematuro: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  "Con complicaciones": "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Fallecido: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Birth>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("motheridentification", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]"
      >
        Madre
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("landidentification", {
    header: "Potrero",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("birthdate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("sex", {
    header: "Sexo",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      const isMale = value === "Macho";
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium ${
            isMale ? "text-[#4B6043]" : "text-[#A9744F]"
          }`}
        >
          <span>{isMale ? "♂" : "♀"}</span>
          <span>{value}</span>
        </span>
      );
    },
  }),
  columnHelper.accessor("race", {
    header: "Raza",
  }),
  columnHelper.accessor("birthweight", {
    header: () => <div className="text-right">Peso (kg)</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right tabular-nums">
          {value ? `${value} kg` : "-"}
        </div>
      );
    },
  }),
  columnHelper.accessor("conditionatbirth", {
    header: "Condición",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={conditionStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("responsible", {
    header: "Responsable",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() || "-"}</span>
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