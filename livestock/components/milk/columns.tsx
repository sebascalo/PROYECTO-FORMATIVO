"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Milk = {
  id_milk: number | string;
  id_Bovine: number;
  milkingDate: string;
  shift: string;
  litersQuantity: number;
  observations: string;
  idResponsible: number;
  active: boolean;
  responsibleData?: ResponsibleData | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
};

const shiftStyles: Record<string, string> = {
  Mañana: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tarde: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Noche: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Milk>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_milk", {
    header: "ID",
    cell: ({ getValue }) => <span className="text-[#6B6459]">{getValue()}</span>,
  }),
  // 👇 COLUMNA BOVINO con filtro de búsqueda arreglado
  columnHelper.accessor("id_Bovine", {
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto p-0 font-semibold uppercase tracking-wide text-xs text-[#6B6459] hover:bg-transparent hover:text-[#2B2A26]">
        Bovino <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    // 👇 Forzamos a que el filtro convierta el ID a texto para que funcione el buscador
    filterFn: (row, id, value) => {
      const searchValue = value.toLowerCase();
      const rowValue = String(row.getValue(id)).toLowerCase();
      return rowValue.includes(searchValue);
    },
    cell: ({ getValue }) => <span className="font-medium text-[#2B2A26]">{getValue()}</span>,
  }),
  columnHelper.accessor("milkingDate", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("shift", {
    header: "Turno",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <Badge className={shiftStyles[value] ?? "bg-[#8C8266] text-white"}>{value}</Badge>;
    },
  }),
  columnHelper.accessor("litersQuantity", {
    header: () => <div className="text-right">Litros</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums font-medium text-[#2B2A26]">
        {getValue() !== null && getValue() !== undefined ? `${getValue()} L` : "-"}
      </div>
    ),
  }),
  columnHelper.accessor("responsibleData", {
    header: "Responsable",
    cell: ({ getValue }) => {
      const responsible = getValue();
      if (!responsible) return <span className="text-[#6B6459]">-</span>;
      return (
        <div className="flex flex-col">
          <span className="text-[#2B2A26] font-medium">{responsible.fullName}</span>
          <span className="text-xs text-[#6B6459]">{responsible.role}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("observations", {
    header: "Observaciones",
    cell: ({ getValue }) => <span className="text-[#6B6459] text-sm">{getValue() || "-"}</span>,
  }),
  columnHelper.accessor("active", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = getValue() === true;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#4B6043]" : "bg-[#B0A896]"}`} />
          <span className={isActive ? "text-[#2B2A26]" : "text-[#6B6459]"}>{isActive ? "Activo" : "Inactivo"}</span>
        </span>
      );
    },
  }),
]);