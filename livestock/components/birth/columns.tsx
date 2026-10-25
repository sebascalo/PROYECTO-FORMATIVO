"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// 👇 Tipos del JOIN (quitamos CattleData porque ya no mostraremos el nombre)
export type RaceData = {
  id_race: number;
  name_race: string;
};

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

// 👇 Forma real de los datos
export type Birth = {
  id_birth: number;
  id_Bovine: number | null;
  birthdate: string;
  sex: string;
  id_race: number | null;
  birthweight: number;
  observations: string;
  idResponsible: number | null;
  active: boolean;
  // JOIN (Solo raza y responsable)
  raceData?: RaceData | null;
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

const columnHelper = createColumnHelper<SharedTableFeatures, Birth>();

export const columns = columnHelper.columns([
  // ID MADRE (
  columnHelper.accessor("id_Bovine", {
    header: "ID Madre",
    // 👇 Forzamos a que el filtro lea números como texto para que el buscador funcione
    filterFn: (row, id, value) => {
      return String(row.getValue(id)).toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">
        {getValue() ?? "Sin madre"}
      </span>
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
  columnHelper.accessor("raceData", {
    header: "Raza",
    cell: ({ getValue }) => {
      const race = getValue();
      return (
        <span className="text-[#2B2A26]">
          {race?.name_race ?? "Sin raza"}
        </span>
      );
    },
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