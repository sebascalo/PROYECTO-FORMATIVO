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
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/pasture/PastureAll?limit=500",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();
        
        const pastureList: Pasture[] = Array.isArray(resJson.info) ? resJson.info : [];
        
        // 👇 INVERTIMOS EL ARREGLO AQUÍ
        setPastures([...pastureList].reverse());
      } catch (error) {
        console.error("Error:", error);
        setPastures([]);
      }
    };
    fetchPastures();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Potreros</h1>
          <p className="text-sm text-[#6B6459]">
            {pastures.length} {pastures.length === 1 ? "potrero registrado" : "potreros registrados"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={pastures}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}