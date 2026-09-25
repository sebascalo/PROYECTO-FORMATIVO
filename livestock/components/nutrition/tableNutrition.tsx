"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Nutrition } from "./columns";

interface TableNutritionProps {
  actions?: React.ReactNode;
}

export default function TableNutrition({ actions }: TableNutritionProps) {
  const [nutritions, setNutritions] = useState<Nutrition[]>([]);

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/nutrition/NutritionAll",
        );
        const resJson = await response.json();
        setNutritions(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setNutritions([]);
      }
    };
    fetchNutritions();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Nutriciones
          </h1>
          <p className="text-sm text-[#6B6459]">
            {nutritions.length}{" "}
            {nutritions.length === 1
              ? "nutrición registrada"
              : "nutriciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={nutritions}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}