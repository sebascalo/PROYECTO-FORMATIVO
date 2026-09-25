"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/food/FoodAll)
export type Food = {
  id: number | string;
  food_name: string;
  food_type: string;
  unit_measure: string;
  stock_quantity: number;
  cost_per_unit: number;
  supplier: string;
  observations: string;
  active: boolean;
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

// Formatear moneda en pesos colombianos
const formatCurrency = (value?: number | null) => {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

const columnHelper = createColumnHelper<SharedTableFeatures, Food>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("food_name", {
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
  columnHelper.accessor("unit_measure", {
    header: "Unidad",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("stock_quantity", {
    header: () => <div className="text-right">Stock</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue() ?? "-"}</div>
    ),
  }),
  columnHelper.accessor("cost_per_unit", {
    header: () => <div className="text-right">Costo/Unidad</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">
        {formatCurrency(getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("supplier", {
    header: "Proveedor",
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