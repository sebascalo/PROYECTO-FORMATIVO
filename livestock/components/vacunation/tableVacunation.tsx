"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Vacunation } from "./columns";

interface TableVacunationProps {
  actions?: React.ReactNode;
}

export default function TableVacunation({ actions }: TableVacunationProps) {
  const [vacunations, setVacunations] = useState<Vacunation[]>([]);

  useEffect(() => {
    const fetchVacunations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/vacunation/VacunationAll",
        );
        const resJson = await response.json();
        setVacunations(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setVacunations([]);
      }
    };
    fetchVacunations();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Vacunaciones
          </h1>
          <p className="text-sm text-[#6B6459]">
            {vacunations.length}{" "}
            {vacunations.length === 1
              ? "vacunación registrada"
              : "vacunaciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={vacunations}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}