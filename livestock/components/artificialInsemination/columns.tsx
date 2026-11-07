"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type ArtificialInsemination = {
  id_artifInse: number | string;
  id_madre: number;
  id_toro: number | null;
  inseminationDate: string;
  semenID: string;
  id_race: number;
  servicio: string;
  observations: string;
  idResponsible: number;
  active: boolean;
  raceData?: { name_race: string } | null;
  responsibleData?: ResponsibleData | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const columnHelper =
  createColumnHelper<SharedTableFeatures, ArtificialInsemination>();

export const getColumns = (
  handleOpenEdit: (record: ArtificialInsemination) => void,
) =>
  columnHelper.columns([
    columnHelper.accessor("id_madre", {
      header: "ID Madre",
      filterFn: (row, id, value) =>
        String(row.getValue(id)).toLowerCase().includes(value.toLowerCase()),
      cell: ({ getValue }) => (
        <span className="font-medium text-[#2B2A26]">
          {getValue() ?? "-"}
        </span>
      ),
    }),

    columnHelper.accessor("id_toro", {
      header: "ID Toro",
      cell: ({ getValue }) => (
        <span className="text-[#2B2A26]">{getValue() ?? "-"}</span>
      ),
    }),

    columnHelper.accessor("inseminationDate", {
      header: "Fecha",
      cell: ({ getValue }) => formatDate(getValue()),
    }),

    columnHelper.accessor("semenID", {
      header: "Código Semen",
      cell: ({ getValue }) => (
        <Badge className="bg-[#8C8266] text-white hover:bg-[#77704F]">
          {getValue() || "-"}
        </Badge>
      ),
    }),

    columnHelper.accessor("raceData", {
      header: "Raza",
      cell: ({ getValue }) => (
        <span className="text-[#2B2A26]">
          {getValue()?.name_race ?? "-"}
        </span>
      ),
    }),

    columnHelper.accessor("responsibleData", {
      header: "Responsable",
      cell: ({ getValue }) => {
        const responsible = getValue();

        if (!responsible) {
          return <span className="text-[#6B6459]">-</span>;
        }

        return (
          <div className="flex flex-col">
            <span className="font-medium text-[#2B2A26]">
              {responsible.fullName}
            </span>
            <span className="text-xs text-[#6B6459]">
              {responsible.role}
            </span>
          </div>
        );
      },
    }),

    columnHelper.accessor("servicio", {
      header: "Servicio",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return <span className="text-[#6B6459]">-</span>;

        return (
          <Badge className="bg-[#4B6043] text-white hover:bg-[#405539]">
            {value}
          </Badge>
        );
      },
    }),

    columnHelper.accessor("observations", {
      header: "Observaciones",
      cell: ({ getValue }) => (
        <span className="text-sm text-[#6B6459]">
          {getValue() || "-"}
        </span>
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

    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => handleOpenEdit(row.original)}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#4B6043]/10 px-3 py-1.5 text-xs font-medium text-[#4B6043] transition-colors hover:bg-[#4B6043]/20 cursor-pointer"
        >
          <Pencil size={14} />
          Editar
        </button>
      ),
    }),
  ]);