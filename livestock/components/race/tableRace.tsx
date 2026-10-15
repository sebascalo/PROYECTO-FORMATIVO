"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Race } from "./columns";

interface TableRaceProps {
  actions?: React.ReactNode;
}

export default function TableRace({ actions }: TableRaceProps) {
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/race/RaceAll",
        );
        const resJson = await response.json();
        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : [];
        setRaces(datos);
      } catch (error) {
        console.error("Error:", error);
        setRaces([]);
      }
    };
    fetchRaces();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Razas</h1>
          <p className="text-sm text-[#6B6459]">
            {races.length}{" "}
            {races.length === 1 ? "raza registrada" : "razas registradas"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={races}
          filterColumnId="name_race"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}