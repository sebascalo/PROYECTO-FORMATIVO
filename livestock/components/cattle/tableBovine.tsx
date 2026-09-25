"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Cattle } from "./columns";

interface TableCattleProps {
  actions?: React.ReactNode;
}

export default function TableCattle({ actions }: TableCattleProps) {
  const [cattles, setCattles] = useState<Cattle[]>([]);

  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/cattle/CattleAll",
        );
        const resJson = await response.json();
        setCattles(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setCattles([]);
      }
    };
    fetchCattles();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Bovinos</h1>
          <p className="text-sm text-[#6B6459]">
            {cattles.length} {cattles.length === 1 ? "animal registrado" : "animales registrados"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={cattles}
          filterColumnId="name"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}
