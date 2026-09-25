"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Treatment } from "./columns";

interface TableTreatmentProps {
  actions?: React.ReactNode;
}

export default function TableTreatment({ actions }: TableTreatmentProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/treatment/TreatmentAll",
        );
        const resJson = await response.json();
        setTreatments(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setTreatments([]);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Tratamientos
          </h1>
          <p className="text-sm text-[#6B6459]">
            {treatments.length}{" "}
            {treatments.length === 1
              ? "tratamiento registrado"
              : "tratamientos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={treatments}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}