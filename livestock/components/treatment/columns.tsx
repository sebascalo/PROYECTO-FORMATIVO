"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";

export type ResponsibleData = {
  idResponsible: number;
  fullName: string;
  role: string;
};

export type Treatment = {
  id_treatment: number | string;
  id_Bovine: number;
  treatment_date: string;
  medication_used: string;
  vaccine_lot: string; 
  applied_dose: string;
  application_route: string;
  associated_diagnosis: string;
  treatment_duration: string;
  withdrawal_time: string; 
  observations: string;
  idResponsible: number;
  active: boolean;
  responsibleData?: ResponsibleData | null;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
};

const routeStyles: Record<string, string> = {
  Oral: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
  Intramuscular: "bg-[#4B6043] text-white hover:bg-[#405539]",
  Intravenosa: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  Tópica: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  Subcutánea: "bg-[#8C8266] text-white hover:bg-[#77704F]",
};

const columnHelper = createColumnHelper<SharedTableFeatures, Treatment>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id_Bovine", {
    header: "ID Bovino",
    filterFn: (row, id, value) => String(row.getValue(id)).toLowerCase().includes(value.toLowerCase()),
    cell: ({ getValue }) => <span className="font-medium text-[#2B2A26]">{getValue()}</span>,
  }),

  columnHelper.accessor("treatment_date", {
    header: "Fecha",
    cell: ({ getValue }) => formatDate(getValue()),
  }),

  columnHelper.accessor("medication_used", {
    header: "Medicamento",
    cell: ({ getValue }) => <span className="text-[#2B2A26]">{getValue() || "-"}</span>,
  }),
  
  columnHelper.accessor("vaccine_lot", {
    header: "Lote",
    cell: ({ getValue }) => <span className="text-[#6B6459]">{getValue() || "-"}</span>,
  }),

  columnHelper.accessor("applied_dose", {
    header: "Dosis (ml)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#2B2A26] tabular-nums">{value.toLowerCase().includes("ml") ? value : `${value} ml`}</span>;
    },
  }),

  columnHelper.accessor("application_route", {
    header: "Vía",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <Badge className={routeStyles[value] ?? "bg-[#8C8266] text-white"}>{value}</Badge>;
    },
  }),

  columnHelper.accessor("associated_diagnosis", {
    header: "Diagnóstico",
    // 👇 Limitamos el ancho máximo para que no estire la tabla
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] block max-w-[120px] truncate" title={getValue() || ""}>
        {getValue() || "-"}
      </span>
    ),
  }),

  columnHelper.accessor("treatment_duration", {
    header: "Duración (días)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#6B6459]">{value.toLowerCase().includes("día") ? value : `${value} días`}</span>;
    },
  }),
  columnHelper.accessor("withdrawal_time", {
    header: "T. Retiro (días)",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return <span className="text-[#6B6459]">-</span>;
      return <span className="text-[#6B6459]">{value.toLowerCase().includes("día") ? value : `${value} días`}</span>;
    },
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
    // 👇 Limitamos el ancho máximo para que no estire la tabla
    cell: ({ getValue }) => (
      <span className="text-[#6B6459] text-sm block max-w-[150px] truncate" title={getValue() || ""}>
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
          <span className={isActive ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </span>
      );
    },
  }),
]);