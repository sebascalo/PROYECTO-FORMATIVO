"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Responsible } from "./columns";

interface TableResponsibleProps {
  actions?: React.ReactNode;
}

export default function TableResponsible({ actions }: TableResponsibleProps) {
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll",
        );
        const resJson = await response.json();
        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : [];
        setResponsibles(datos);
      } catch (error) {
        console.error("Error:", error);
        setResponsibles([]);
      }
    };
    fetchResponsibles();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Responsables
          </h1>
          <p className="text-sm text-[#6B6459]">
            {responsibles.length}{" "}
            {responsibles.length === 1
              ? "responsable registrado"
              : "responsables registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={responsibles}
          filterColumnId="fullName"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}