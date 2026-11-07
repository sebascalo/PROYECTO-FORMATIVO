"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";
import { Pencil } from "lucide-react";

// Forma de los datos que devuelve tu API (/api/race/RaceAll)
export type Race = {
  id_race: number | string;
  name_race: string;
  active: string;
};

const columnHelper = createColumnHelper<SharedTableFeatures, Race>();

export const getColumns = (handleOpenEdit: (race: Race) => void) =>
  columnHelper.columns([
    columnHelper.accessor("name_race", {
      header: "Nombre de la Raza",
      cell: ({ getValue }) => (
        <span className="font-medium text-[#2B2A26]">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("active", {
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
