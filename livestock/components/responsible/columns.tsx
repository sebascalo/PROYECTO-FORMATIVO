
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";
import { Pencil } from "lucide-react";

export type Responsible = {
  idResponsible: number | string;
  fullName: string;
  role: string;
  email: string;
  phoneNumber: string;
  status: string;
};

const roleStyles: Record<string, string> = {
  Veterinario: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Administrador: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Operario: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Gerente: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Asistente: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Otro: "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Responsible>();

export const getColumns = (
  handleOpenEdit: (responsible: Responsible) => void
) => columnHelper.columns([
  columnHelper.accessor("fullName", {
    header: "Nombre Completo",
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Rol",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={roleStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("phoneNumber", {
    header: "Teléfono",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">
        {getValue() || "-"}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = getValue() === "Active";
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
