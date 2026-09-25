"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Pasture } from "./columns";

interface TablePastureProps {
  actions?: React.ReactNode;
}

export default function TablePasture({ actions }: TablePastureProps) {
  const [pastures, setPastures] = useState<Pasture[]>([]);

  useEffect(() => {
    const fetchPastures = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/pasture/PastureAll",
        );
        const resJson = await response.json();
        setPastures(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setPastures([]);
      }
    };
    fetchPastures();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Potreros</h1>
          <p className="text-sm text-[#6B6459]">
            {pastures.length}{" "}
            {pastures.length === 1
              ? "potrero registrado"
              : "potreros registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={pastures}
          filterColumnId="name"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}