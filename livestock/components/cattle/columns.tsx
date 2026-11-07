"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";
import { Pencil } from "lucide-react";

// Tipos
export type RaceData = {
  id_race: number;
  name_race: string;
};

export type CattleParentData = {
  id_Bovine: number | string;
  name: string;
};

export type Cattle = {
  id_Bovine: number | string;
  name: string;
  id_race: number;
  sex: string;
  entrydate: string;
  id_mother?: number | null;
  id_father?: number | null;
  birthdate: string;
  photo?: string | null;
  currentweight: number;
  classificationbytype: string;
  active: number | string;
  raceData?: RaceData | null;
  motherData?: CattleParentData | null;
  fatherData?: CattleParentData | null;
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

// Colores por clasificación
const classificationStyles: Record<string, string> = {
  Toro: "bg-[#4B6043] text-white hover:bg-[#405539]",
  "Novilla levante": "bg-[#8C8266] text-white hover:bg-[#77704F]",
  "Novilla vientre": "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Ternero: "bg-[#2B7FFF] text-white hover:bg-[#1E63CC]",
  Vaca: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Cattle>();

// Columnas de bovinos
export const getColumns = (
  handleOpenEdit: (cattle: Cattle) => void
) => columnHelper.columns([
  columnHelper.accessor("id_Bovine", {
    header: "ID BOVINO",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),

  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),

  columnHelper.accessor("raceData", {
    header: "Raza",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">
        {getValue()?.name_race ?? "Sin raza"}
      </span>
    ),
  }),

  columnHelper.accessor("sex", {
    header: "Sexo",
  }),

  columnHelper.accessor("fatherData", {
    header: "Padre",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">
        {getValue()?.name ?? "-"}
      </span>
    ),
  }),

  columnHelper.accessor("motherData", {
    header: "Madre",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">
        {getValue()?.name ?? "-"}
      </span>
    ),
  }),

  columnHelper.accessor("entrydate", {
    header: "Fecha Ingreso",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  columnHelper.accessor("birthdate", {
    header: "Fecha Nac.",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  columnHelper.accessor("currentweight", {
    header: () => <div className="text-right">Peso (kg)</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">
        {getValue()} kg
      </div>
    ),
  }),

  columnHelper.accessor("classificationbytype", {
    header: "Clasificación",
    cell: ({ getValue }) => {
      const value = getValue();

      return (
        <Badge
          className={
            classificationStyles[value] ?? "bg-[#8C8266] text-white"
          }
        >
          {value}
        </Badge>
      );
    },
  }),

  columnHelper.accessor("active", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = Number(getValue()) === 1;

      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-[#4B6043]" : "bg-[#B0A896]"
            }`}
          />
          <span
            className={
              isActive ? "text-[#2B2A26]" : "text-[#6B6459]"
            }
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </span>
      );
    },
  }),

  // Botón para editar
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <button
        type="button"
        onClick={() => handleOpenEdit(row.original)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4B6043] bg-[#4B6043]/10 hover:bg-[#4B6043]/20 rounded-md transition-colors cursor-pointer"
      >
        <Pencil size={14} />
        Editar
      </button>
    ),
  }),
]);