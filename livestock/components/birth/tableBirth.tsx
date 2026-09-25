"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Birth } from "./columns";

interface TableBirthProps {
  actions?: React.ReactNode;
}

export default function TableBirth({ actions }: TableBirthProps) {
  const [births, setBirths] = useState<Birth[]>([]);

  useEffect(() => {
    const fetchBirths = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/birth/BirthAll",
        );
        const resJson = await response.json();
        setBirths(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setBirths([]);
      }
    };
    fetchBirths();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Nacimientos</h1>
          <p className="text-sm text-[#6B6459]">
            {births.length}{" "}
            {births.length === 1
              ? "nacimiento registrado"
              : "nacimientos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={births}
          filterColumnId="motheridentification"
          filterPlaceholder="Filtrar por madre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}