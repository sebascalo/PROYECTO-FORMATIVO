"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mortality } from "./columns";

interface TableMortalityProps {
  actions?: React.ReactNode;
}

export default function TableMortality({ actions }: TableMortalityProps) {
  const [mortalidades, setMortalidades] = useState<Mortality[]>([]);

  useEffect(() => {
    const fetchMortalidades = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/mortality/MortalityAll",
        );
        const resJson = await response.json();
        setMortalidades(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setMortalidades([]);
      }
    };
    fetchMortalidades();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Mortalidades
          </h1>
          <p className="text-sm text-[#6B6459]">
            {mortalidades.length}{" "}
            {mortalidades.length === 1
              ? "mortalidad registrada"
              : "mortalidades registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={mortalidades}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}