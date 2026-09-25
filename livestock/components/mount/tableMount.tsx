"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mount } from "./columns";

interface TableMountProps {
  actions?: React.ReactNode;
}

export default function TableMount({ actions }: TableMountProps) {
  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const fetchMounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/mount/MountAll",
        );
        const resJson = await response.json();
        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : [];
        setMounts(datos);
      } catch (error) {
        console.error("Error:", error);
        setMounts([]);
      }
    };
    fetchMounts();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Montas Naturales
          </h1>
          <p className="text-sm text-[#6B6459]">
            {mounts.length}{" "}
            {mounts.length === 1
              ? "monta registrada"
              : "montas registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={mounts}
          filterColumnId="idBovine"
          filterPlaceholder="Filtrar por vaca..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}