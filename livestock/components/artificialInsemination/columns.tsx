"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type CattleData = {
  id_Bovine: number;
  name: string;
};

export type RaceData = {
  id_race: number;
  name_race: string;
};

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type ArtificialInsemination = {
  id_artifInse: number | string;
  id_Bovine: number;
  inseminationDate: string;
  semenID: string;
  id_race: number;
  observations: string;
  idResponsible: number;
  cattleData?: CattleData | null;
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

const columnHelper = createColumnHelper<
  SharedTableFeatures,
  ArtificialInsemination
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_artifInse", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  // 👇 BOVINO
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
  columnHelper.accessor("inseminationDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("semenID", {
    header: "Código Semen",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className="bg-[#8C8266] text-white hover:bg-[#77704F]">
          {value}
        </Badge>
      );
    },
  }),
  // 👇 RAZA
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
  // 👇 RESPONSABLE
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
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>
    ),
  }),
]);