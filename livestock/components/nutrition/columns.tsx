"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/nutrition/NutritionAll)
export type Nutrition = {
  id: number | string;
  idBovine: string;
  idFood: string;
  food_type: string;
  quantity: string;
  frequency: string;
  idResponsible: string;
};

// Colores por tipo de alimento
const foodTypeStyles: Record<string, string> = {
  Pasto: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Concentrado: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Silo: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Forraje: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Suplemento: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Mineral: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Otro: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

// Colores por frecuencia
const frequencyStyles: Record<string, string> = {
  Mañana: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tarde: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Noche: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  "Mañana y Tarde": "bg-[#4B6043] text-white hover:bg-[#405539]",
  "Mañana, Tarde y Noche": "bg-[#4B6043] text-white hover:bg-[#405539]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Nutrition>();

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
  columnHelper.accessor("idFood", {
    header: "Alimento",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("food_type", {
    header: "Tipo",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={foodTypeStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Cantidad",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">
        {getValue() || "-"}
      </span>
    ),
  }),
  columnHelper.accessor("frequency", {
    header: "Frecuencia",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge
          className={frequencyStyles[value] ?? "bg-[#8C8266] text-white"}
        >
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
]);