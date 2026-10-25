"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, type Race } from "./columns"; // Asegúrate que el tipo se llame Race

interface TableRaceProps {
  actions?: React.ReactNode;
}

export default function TableRace({ actions }: TableRaceProps) {
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/race/RaceAll?limit=500", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        
        const raceList: Race[] = Array.isArray(resJson.info) ? resJson.info : [];
        
        // 👇 INVERTIMOS EL ARREGLO AQUÍ PARA QUE EL ÚLTIMO SALGA PRIMERO
        setRaces([...raceList].reverse());
      } catch (error) {
        console.error("Error:", error);
        setRaces([]);
      }
    };
    fetchRaces();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Razas</h1>
          <p className="text-sm text-[#6B6459]">
            {races.length} {races.length === 1 ? "raza registrada" : "razas registradas"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={races}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}