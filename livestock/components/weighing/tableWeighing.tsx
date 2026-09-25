"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Weighing } from "./columns";

interface TableWeighingProps {
  actions?: React.ReactNode;
}

export default function TableWeighing({ actions }: TableWeighingProps) {
  const [weighings, setWeighings] = useState<Weighing[]>([]);

  useEffect(() => {
    const fetchWeighings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/weighing/WeighingAll",
        );
        const resJson = await response.json();
        setWeighings(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setWeighings([]);
      }
    };
    fetchWeighings();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Pesajes</h1>
          <p className="text-sm text-[#6B6459]">
            {weighings.length}{" "}
            {weighings.length === 1
              ? "pesaje registrado"
              : "pesajes registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={weighings}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}