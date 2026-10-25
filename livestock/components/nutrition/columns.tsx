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

export type FoodData = {
  id_food: number;
  food_name: string;
  food_type: string;
};

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Nutrition = {
  id_nutrition: number;
  id_Bovine: number;
  id_food: number;
  quantity: string;
  frequency: string;
  idResponsible: number;
  active: boolean; // 👈 NUEVO
  cattleData?: CattleData | null;
  foodData?: FoodData | null;
  responsibleData?: ResponsibleData | null;
};

const frequencyStyles: Record<string, string> = {
  Mañana: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tarde: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Noche: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  "Mañana y Tarde": "bg-[#4B6043] text-white hover:bg-[#405539]",
  "Mañana, Tarde y Noche": "bg-[#4B6043] text-white hover:bg-[#405539]",
};

const foodTypeStyles: Record<string, string> = {
  Pasto: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Concentrado: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Silo: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Forraje: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Suplemento: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Mineral: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Otro: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Nutrition>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_nutrition", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("cattleData", {
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
    cell: ({ getValue }) => {
      const cattle = getValue();
      return (
        <span className="font-medium text-[#2B2A26]">
          {cattle?.name ?? "Sin bovino"}
        </span>
      );
    },
  }),
  columnHelper.accessor("foodData", {
    header: "Alimento",
    cell: ({ getValue }) => {
      const food = getValue();
      if (!food) return <span className="text-[#6B6459]">-</span>;
      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#2B2A26]">{food.food_name}</span>
          <Badge
            className={
              foodTypeStyles[food.food_type] ?? "bg-[#8C8266] text-white"
            }
          >
            {food.food_type}
          </Badge>
        </div>
      );
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Cantidad",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("frequency", {
    header: "Frecuencia",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={frequencyStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
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