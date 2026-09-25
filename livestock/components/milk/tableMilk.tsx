"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Milk } from "./columns";

interface TableMilkProps {
  actions?: React.ReactNode;
}

export default function TableMilk({ actions }: TableMilkProps) {
  const [milks, setMilks] = useState<Milk[]>([]);

  useEffect(() => {
    const fetchMilks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/milk/MilkAll");
        const resJson = await response.json();
        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : [];
        setMilks(datos);
      } catch (error) {
        console.error("Error:", error);
        setMilks([]);
      }
    };
    fetchMilks();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Producción de Leche
          </h1>
          <p className="text-sm text-[#6B6459]">
            {milks.length}{" "}
            {milks.length === 1
              ? "producción registrada"
              : "producciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={milks}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}