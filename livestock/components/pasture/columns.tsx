"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type Pasture = {
  id_pasture: number | string;
  name: string;
  extension: number;
  forageCapacity: number;
  pastureType: string;
  currentStatus: string;
  cattleEntryDate: string | null;
  cattleExitDate: string | null;
  observations: string;
  active: boolean; // 👈 NUEVO
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
};

const statusStyles: Record<string, string> = {
  activa: "bg-[#4B6043] text-white hover:bg-[#405539]",
  descanso: "bg-[#A9744F] text-white hover:bg-[#94623F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Pasture>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ getValue }) => <span className="font-medium text-[#2B2A26]">{getValue()}</span>,
  }),
  columnHelper.accessor("extension", {
    header: () => <div className="text-right">Extensión</div>,
    cell: ({ getValue }) => <div className="text-right tabular-nums">{getValue()} ha</div>,
  }),
  columnHelper.accessor("forageCapacity", {
    header: () => <div className="text-right">Aforo</div>,
    cell: ({ getValue }) => <div className="text-right tabular-nums">{getValue()} anim.</div>,
  }),
  columnHelper.accessor("pastureType", {
    header: "Tipo Pastura",
    cell: ({ getValue }) => <span className="text-[#2B2A26]">{getValue()}</span>,
  }),
  columnHelper.accessor("currentStatus", {
    header: "Estado Actual",
    cell: ({ getValue }) => {
      const value = getValue();
      return <Badge className={statusStyles[value] ?? "bg-[#8C8266] text-white"}>{value}</Badge>;
    },
  }),
  columnHelper.accessor("cattleEntryDate", {
    header: "Ingreso",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("cattleExitDate", {
    header: "Salida",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>,
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