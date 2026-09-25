"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/mortality/MortalityAll)
export type Mortality = {
  id: number | string;
  idBovine: string;
  dateofdeath: string;
  causeofdeath: string;
  responsible: string;
  fateoftheanimal: string;
  observations: string;
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

// Colores por causa de muerte
const causeStyles: Record<string, string> = {
  Enfermedad: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Accidente: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Parto: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Vejez: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Parásitos: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Desnutrición: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Intoxicación: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Depredador: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Desconocida: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Otra: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Mortality>();

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
  columnHelper.accessor("dateofdeath", {
    header: "Fecha de Muerte",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("causeofdeath", {
    header: "Causa",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={causeStyles[value] ?? "bg-[#8C8266] text-white"}>
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
  columnHelper.accessor("fateoftheanimal", {
    header: "Destino",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>
    ),
  }),
]);