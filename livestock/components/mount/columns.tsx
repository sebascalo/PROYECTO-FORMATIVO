
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";
import { Pencil } from "lucide-react";

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Mount = {
  id_mount: number | string;
  id_cow: number;
  id_bull: number;
  breedingDate: string;
  serviceNumber: number;
  observations: string;
  idResponsible: number;
  active: boolean;
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

const columnHelper = createColumnHelper<SharedTableFeatures, Mount>();

export const getColumns = (handleOpenEdit: (mount: Mount) => void) => columnHelper.columns([
  columnHelper.accessor("id_cow", {
    header: "ID Madre",
    filterFn: (row, id, value) =>
      String(row.getValue(id)).toLowerCase().includes(value.toLowerCase()),
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue() ?? "-"}</span>
    ),
  }),

  columnHelper.accessor("id_bull", {
    header: "ID Padre",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26]">{getValue() ?? "-"}</span>
    ),
  }),

  columnHelper.accessor("breedingDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  columnHelper.accessor("serviceNumber", {
    header: "Servicio",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className="bg-[#4B6043] text-white hover:bg-[#405539]">
          Servicio {value}
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

  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>
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
