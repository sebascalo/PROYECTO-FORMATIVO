"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type ArtificialInsemination } from "./columns";

interface TableArtificialInseminationProps {
  actions?: React.ReactNode;
}

export default function TableArtificialInsemination({
  actions,
}: TableArtificialInseminationProps) {
  const [inseminations, setInseminations] = useState<ArtificialInsemination[]>(
    [],
  );

  useEffect(() => {
    const fetchInseminations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/artificialInsemination/ArtificialInseminationAll",
        );
        const resJson = await response.json();

        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : [];

        setInseminations(datos);
      } catch (error) {
        console.error("Error:", error);
        setInseminations([]);
      }
    };
    fetchInseminations();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Inseminaciones Artificiales
          </h1>
          <p className="text-sm text-[#6B6459]">
            {inseminations.length}{" "}
            {inseminations.length === 1
              ? "inseminación registrada"
              : "inseminaciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={inseminations}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por código de semen..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}