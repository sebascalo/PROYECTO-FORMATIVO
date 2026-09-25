"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

// Forma de los datos que devuelve tu API (/api/user/UserAll)
export type User = {
  userId: number | string;
  name: string;
  email: string;
  documentId: string;
  postJob: string;
  verifyEmail: boolean;
  active: boolean;
};

// Colores por cargo
const postJobStyles: Record<string, string> = {
  administrador: "bg-[#4B6043] text-white hover:bg-[#405539]",
  veterinaria: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  operario: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  gerente: "bg-[#4B6043] text-white hover:bg-[#405539]",
  asistente: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, User>();

export const columns = columnHelper.columns([
  columnHelper.accessor("userId", {
    header: "ID",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("name", {
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
  columnHelper.accessor("email", {
    header: "Correo",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("documentId", {
    header: "Documento",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">
        {getValue() || "-"}
      </span>
    ),
  }),
  columnHelper.accessor("postJob", {
    header: "Cargo",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return (
        <Badge className={postJobStyles[value] ?? "bg-[#8C8266] text-white"}>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("verifyEmail", {
    header: "Verificación",
    cell: ({ getValue }) => {
      const isVerified = getValue() === true;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isVerified ? "bg-[#4B6043]" : "bg-[#A9744F]"
            }`}
          />
          <span className={isVerified ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {isVerified ? "Verificado" : "No verificado"}
          </span>
        </span>
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